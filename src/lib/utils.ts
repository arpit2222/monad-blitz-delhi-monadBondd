import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format an Ethereum address for display
 * @param address The full Ethereum address
 * @param startChars Number of starting characters to show
 * @param endChars Number of ending characters to show
 * @returns Formatted address (e.g., 0x1234...5678)
 */
export function formatAddress(
  address: string,
  startChars = 6,
  endChars = 4
): string {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
}
