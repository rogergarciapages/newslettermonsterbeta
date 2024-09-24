import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      image: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    picture: string;
  }
}