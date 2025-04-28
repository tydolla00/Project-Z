import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges class names using `clsx` and Tailwind's `twMerge`.
 *
 * Accepts any number of class values, filters and joins them with `clsx`, then merges Tailwind CSS classes to resolve conflicts.
 *
 * @param inputs - Class values to be combined and merged.
 * @returns A single merged class name string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a promise that resolves after a specified delay.
 *
 * @param ms - The delay in milliseconds
 * @returns A promise that resolves after the specified delay
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const domain =
  process.env.NODE_ENV === "production"
    ? "https://pockettrading.vercel.app"
    : "http://localhost:3000";

/**
 * Creates a debounced version of a function that delays its execution until after a specified time has elapsed
 * since the last time it was called.
 *
 * @param fn - The function to debounce
 * @param delay - The number of milliseconds to delay execution
 * @returns A debounced version of the input function
 *
 * @example
 * ```typescript
 * const debouncedSearch = debounce((query) => {
 *   // perform search
 * }, 300);
 * ```
 */
export const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
