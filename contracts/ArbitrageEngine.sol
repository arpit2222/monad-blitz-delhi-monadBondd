// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * Arbitrage Engine
 * Executes parallel arbitrage by buying on Pool A and selling on Pool B
 * Demonstrates Monad's parallel execution capability
 */
contract ArbitrageEngine {
    IERC20 public bondToken;
    IERC20 public usdcToken;
    
    // Pool addresses
    address public poolA;
    address public poolB;
    
    // Track arbitrage executions
    uint256 public arbitrageCount = 0;
    
    struct ArbitrageResult {
        uint256 id;
        uint256 timestamp;
        uint256 usdcIn;
        uint256 bondsReceived;
        uint256 usdcOut;
        uint256 profit;
        uint256 executionTime;
    }
    
    mapping(uint256 => ArbitrageResult) public arbitrages;
    mapping(address => uint256[]) public userArbitrages;
    
    event ArbitrageExecuted(
        uint256 indexed arbitrageId,
        address indexed user,
        uint256 usdcIn,
        uint256 bondsReceived,
        uint256 usdcOut,
        uint256 profit,
        uint256 executionTime
    );
    
    constructor(
        address _bondToken,
        address _usdcToken,
        address _poolA,
        address _poolB
    ) {
        require(_bondToken != address(0), "Invalid bond token");
        require(_usdcToken != address(0), "Invalid USDC token");
        require(_poolA != address(0), "Invalid pool A");
        require(_poolB != address(0), "Invalid pool B");
        
        bondToken = IERC20(_bondToken);
        usdcToken = IERC20(_usdcToken);
        poolA = _poolA;
        poolB = _poolB;
    }
    
    /**
     * Execute parallel arbitrage
     * Buy on Pool A, sell on Pool B in same transaction (atomic)
     */
    function executeParallelArbitrage(uint256 usdcAmount) external returns (uint256) {
        require(usdcAmount > 0, "Amount must be > 0");
        require(usdcToken.balanceOf(msg.sender) >= usdcAmount, "Insufficient USDC");
        
        uint256 startTime = block.timestamp;
        
        // Transfer USDC from user to this contract
        require(
            usdcToken.transferFrom(msg.sender, address(this), usdcAmount),
            "USDC transfer failed"
        );
        
        // Step 1: Approve and swap on Pool A (BUY bonds with USDC)
        usdcToken.approve(poolA, usdcAmount);
        uint256 bondsReceived = _callPoolASwap(usdcAmount);
        require(bondsReceived > 0, "Pool A swap failed");
        
        // Step 2: Approve and swap on Pool B (SELL bonds for USDC)
        bondToken.approve(poolB, bondsReceived);
        uint256 usdcOut = _callPoolBSwap(bondsReceived);
        require(usdcOut > 0, "Pool B swap failed");
        
        // Calculate profit
        uint256 profit = usdcOut > usdcAmount ? usdcOut - usdcAmount : 0;
        
        // Transfer profit to user (if any)
        if (profit > 0) {
            require(usdcToken.transfer(msg.sender, profit), "Profit transfer failed");
        }
        
        // Track arbitrage
        arbitrageCount++;
        uint256 executionTime = block.timestamp - startTime;
        
        ArbitrageResult memory result = ArbitrageResult({
            id: arbitrageCount,
            timestamp: block.timestamp,
            usdcIn: usdcAmount,
            bondsReceived: bondsReceived,
            usdcOut: usdcOut,
            profit: profit,
            executionTime: executionTime
        });
        
        arbitrages[arbitrageCount] = result;
        userArbitrages[msg.sender].push(arbitrageCount);
        
        emit ArbitrageExecuted(
            arbitrageCount,
            msg.sender,
            usdcAmount,
            bondsReceived,
            usdcOut,
            profit,
            executionTime
        );
        
        return profit;
    }
    
    /**
     * Internal: Call Pool A swap function
     */
    function _callPoolASwap(uint256 usdcAmount) internal returns (uint256) {
        // Pool A signature: swap(uint256 usdcAmount) returns (uint256 bondsOut)
        (bool success, bytes memory data) = poolA.call(
            abi.encodeWithSignature("swap(uint256)", usdcAmount)
        );
        require(success, "Pool A call failed");
        return abi.decode(data, (uint256));
    }
    
    /**
     * Internal: Call Pool B swap function
     */
    function _callPoolBSwap(uint256 bondsAmount) internal returns (uint256) {
        // Pool B signature: swap(uint256 bondsAmount) returns (uint256 usdcOut)
        (bool success, bytes memory data) = poolB.call(
            abi.encodeWithSignature("swap(uint256)", bondsAmount)
        );
        require(success, "Pool B call failed");
        return abi.decode(data, (uint256));
    }
    
    /**
     * Get arbitrage details by ID
     */
    function getArbitrage(uint256 id) external view returns (ArbitrageResult memory) {
        require(id > 0 && id <= arbitrageCount, "Invalid arbitrage ID");
        return arbitrages[id];
    }
    
    /**
     * Get user's arbitrage history
     */
    function getUserArbitrages(address user) external view returns (uint256[] memory) {
        return userArbitrages[user];
    }
    
    /**
     * Get total arbitrages executed
     */
    function getTotalArbitrages() external view returns (uint256) {
        return arbitrageCount;
    }
    
    /**
     * Calculate expected profit (for frontend display)
     */
    function calculateExpectedProfit(uint256 usdcAmount) external pure returns (uint256) {
        // Pool A: $98.50 per bond
        // Pool B: $99.10 per bond
        // Profit: $0.60 per bond
        // For demo: return approximate profit
        
        // bonds = usdcAmount / 98.50
        // profit = bonds * (99.10 - 98.50) = bonds * 0.60
        
        uint256 approximateProfit = (usdcAmount * 60) / 9850; // 60 basis points profit
        return approximateProfit;
    }
}
