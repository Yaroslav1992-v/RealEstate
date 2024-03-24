import { NextAuthOptions } from "next-auth";
import connectDB from "@/config/database";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  // Add other properties if necessary
}
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //invoked on successful sign in
    async signIn({ profile }) {
      await connectDB();
      if (!profile) {
        return true;
      }

      const userExist = await User.findOne({ email: profile.email });
      if (!userExist) {
        const username = profile?.name?.slice(0, 20);
        await User.create({
          email: profile.email,
          username: profile.name,
          image: profile.image,
        });
      }
      return true;
    },
    async session({ session }) {
      const user = await User.findOne({ email: session.user?.email });
      session.user = {
        ...session.user,
        id: user._id.toString(),
      } as SessionUser;

      return session;
    },
  },
};
