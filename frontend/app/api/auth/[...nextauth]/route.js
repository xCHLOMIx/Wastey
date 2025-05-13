import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
        });
      }

      return true;
    },
    async session({ session }) {
      await connectDB(); // optional but safe in case not connected
      const dbUser = await User.findOne({ email: session.user.email });

      session.user.id = dbUser._id.toString(); // ensure it's a string
      session.user.points = dbUser.points;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
