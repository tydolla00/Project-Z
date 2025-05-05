/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      provider?: string;
    } & DefaultSession["user"];
  }
}

export const config: NextAuthConfig = {
  providers: [GitHub, Google],
  pages: {
    signIn: "/signin",
    error: "/not-allowed",
  },
  logger: {
    async error(error) {
      console.log(error.cause);
      console.log(error.stack);
    },
  },
  callbacks: {
    // async signIn(params) {},
    jwt: async ({ token, user, account, profile, trigger, session }) => {
      if (account) {
        token.provider = account?.provider.toUpperCase();
      }
      return token;
    },
    session: async ({ session, token, newSession, user, trigger }) => {
      if (token) {
        // TODO Handle undefined provider.
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },
};

export const { signIn, signOut, handlers, auth } = NextAuth(config);
