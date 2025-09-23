import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price value to Vietnamese currency
 */
export function formatPrice(value?: number | string | null): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value; // already formatted
  
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  } catch {
    return String(value);
  }
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Retrieves a fallback image URL for products
 */
export function getFallbackProductImage(): string {
  return 'https://images.unsplash.com/photo-1553279030-83ba509d4d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300';
}
