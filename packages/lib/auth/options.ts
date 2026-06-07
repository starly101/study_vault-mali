import NextAuth, { type NextAuthOptions } from "next-auth";
import { createAuthOptions, hasGoogleOAuth, createProviders } from "./unified-auth";

export const authOptions: NextAuthOptions = createAuthOptions();

export default NextAuth(authOptions);
