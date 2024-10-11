import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, NextAuthOptions } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { env } from "process";
import { prisma } from "../lib/prisma-client";
import { generateUniqueUsername } from "../utils/username-generator";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      user_id: string;
      profile_photo?: string | null; // Include profile photo
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user_id: string;
    profile_photo?: string | null;
  }
}

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    }),
    LinkedInProvider({
      clientId: env.LINKEDIN_CLIENT_ID as string,
      clientSecret: env.LINKEDIN_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID as string,
      clientSecret: env.DISCORD_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID as string,
      clientSecret: env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user_id = user.user_id;
        token.profile_photo = user?.image || (await prisma.user.findUnique({
          where: { user_id: user.user_id }
        }))?.profile_photo; // Retrieve from Supabase if not provided
      }
      return token;
    },
    async session({ session, token }) {
      session.user.user_id = token.user_id;
      session.user.profile_photo = token.profile_photo; // Use profile photo
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: env.NEXTAUTH_SECRET,
  },
  events: {
    async createUser(message) {
      const { user } = message;
      const username = await generateUniqueUsername();
      await prisma.user.update({
        where: { user_id: user.user_id },
        data: { username },
      });
    },
  },
};

export default options;
