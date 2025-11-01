'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';

export function CustomConnectButton() {
  useEffect(() => {
    // Add a style tag to fix modal positioning when component mounts
    const styleId = 'rainbowkit-modal-fix';
    
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Fix RainbowKit modal positioning */
        div[role="dialog"][data-rk] {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          z-index: 2147483647 !important;
          margin: 0 !important;
          max-width: 400px !important;
          width: 90% !important;
        }
        
        /* Fix backdrop */
        div[data-rk] > div[style*="position"] {
          position: fixed !important;
          inset: 0 !important;
          z-index: 2147483646 !important;
          background: rgba(0, 0, 0, 0.4) !important;
          backdrop-filter: blur(4px) !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, []);

  return (
    <ConnectButton
      showBalance={false}
      accountStatus="address"
      chainStatus="icon"
      label="Connect Wallet"
    />
  );
}

export function CustomConnectButtonMobile() {
  useEffect(() => {
    // Add a style tag to fix modal positioning when component mounts
    const styleId = 'rainbowkit-modal-fix';
    
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Fix RainbowKit modal positioning */
        div[role="dialog"][data-rk] {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          z-index: 2147483647 !important;
          margin: 0 !important;
          max-width: 400px !important;
          width: 90% !important;
        }
        
        /* Fix backdrop */
        div[data-rk] > div[style*="position"] {
          position: fixed !important;
          inset: 0 !important;
          z-index: 2147483646 !important;
          background: rgba(0, 0, 0, 0.4) !important;
          backdrop-filter: blur(4px) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <ConnectButton
      showBalance={false}
      accountStatus="avatar"
      chainStatus="icon"
      label=""
    />
  );
}
