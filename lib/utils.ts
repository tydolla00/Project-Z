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

export const domain =
  process.env.NODE_ENV === "production"
    ? "https://pockettrading.vercel.app"
    : "http://localhost:3000";
