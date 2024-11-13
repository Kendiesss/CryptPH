// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
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
          return { id: user._id, name: `${user.firstName} ${user.lastName}`, email: user.email, role: user.role };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      // Attach the role from the token to the session
      session.user = {
        ...session.user,
        role: token.user?.role || "user",
        firstName: token.user?.firstName,  // Add firstName
        lastName: token.user?.lastName,    // Add lastName
      };
      return session;
    },
    async jwt({ token, user, account, profile }) {
      await dbConnect();

      if (account && account.provider === "google") {
        let dbUser = await User.findOne({ email: profile.email });

        if (!dbUser) {
          dbUser = await User.create({
            firstName: profile.given_name || profile.name.split(" ")[0],
            lastName: profile.family_name || profile.name.split(" ")[1] || "",
            email: profile.email,
            password: null,
            authProvider: "google",
            role: "user", // Default role, you may want to customize this
          });
        }

        token.user = {
          id: dbUser._id,
          name: `${dbUser.firstName} ${dbUser.lastName}`,
          email: dbUser.email,
          image: profile.picture,
          role: dbUser.role, // Include the role
        };
      }

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
