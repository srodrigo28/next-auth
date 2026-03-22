import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authSecret = process.env.NEXTAUTH_SECRET ?? "";
const googleClientId = process.env.AUTH_GOOGLE_ID ?? "";
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET ?? "";

const missingAuthVars = [
  !authSecret && "NEXTAUTH_SECRET",
  !googleClientId && "AUTH_GOOGLE_ID",
  !googleClientSecret && "AUTH_GOOGLE_SECRET",
].filter(Boolean) as string[];

export const isAuthConfigured = missingAuthVars.length === 0;

export const authOptions: NextAuthOptions = {
  secret: authSecret || undefined,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: isAuthConfigured
    ? [
        GoogleProvider({
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        }),
      ]
    : [],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = typeof token.picture === "string" ? token.picture : null;
      }

      return session;
    },
  },
};

let hasLoggedMissingEnv = false;

export async function getAuthSession() {
  if (!isAuthConfigured) {
    if (!hasLoggedMissingEnv) {
      console.error(
        `Authentication is not fully configured. Missing environment variables: ${missingAuthVars.join(", ")}.`,
      );
      hasLoggedMissingEnv = true;
    }

    return null;
  }

  return getServerSession(authOptions);
}
