import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession, token } = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [jwtClient()],
});
