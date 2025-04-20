export { auth as middleware } from "@/app/auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

// this will update the session expiry every time its called.
// export { auth as middleware } from "@/auth"
