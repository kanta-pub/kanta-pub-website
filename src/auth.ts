import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {login} from "./utils/User"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const user = await login(credentials);
          return JSON.parse(JSON.stringify(user)) || null;
      } catch (error) {
          console.error("Authorization error:", error.message);
          throw new Error("Authorization failed");
      }
      },
    })
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
            session.user.role = token.role;
            session.user.id = token.sub;
            session.user.name = token.name;
            session.user.email = token.email;
        return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
        if (user) {
            token.role = user.role;
            token.email=user.email;
        }
        return token;
    },
   
},
pages: {
  signOut: '/', // Redirect to home page after sign-out
},
secret: process.env.AUTH_SECRET,
session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
}
})