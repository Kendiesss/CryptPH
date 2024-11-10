// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        await dbConnect();

        // Find user in database by email
        const user = await User.findOne({ email: credentials.email });
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          // Return a limited user object for the session
          return { id: user._id, name: `${user.firstName} ${user.lastName}`, email: user.email };
        }
        // Return null if authentication fails
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      // Attach the user details from token to session
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      // Add user object to token on initial login
      if (user) {
        token.user = user;
      }
      return token;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
