"use server";

import { signOut } from "@/app/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

/**
 * Updates the authentication status based on the provided session.
 *
 * If a session is provided, it signs out the user and redirects to the home page.
 * If no session is provided, it redirects the user to the sign-in page.
 *
 * @param {Session | null} session - The current user session.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const updateAuthStatus = async (session: Session | null) => {
  if (session) await signOut({ redirectTo: "/" });
  else redirect("/signin");
};
