import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
// import Adapters from "next-auth/adapters/";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
const prisma = new PrismaClient();
// import prisma from "../../../lib/prisma";
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    
    // callbacks: {
    //     async session({ session, token, user }) {
    //         console.log("------------ SESSION ROLE ----------------: ",session,"==== +++++ ====" ,user);
    //       session.user.role = user.role; // Add role value to user object so it is passed along with session
          
    //       return session;
    //     }
    //   },
      secret: process.env.JWT_SECRET,
      callbacks: {
        async session({ session, token, user }) {
          session.user.role = user.role; // Add role value to user object so it is passed along with session
          return session;
        }
      },
      adapter: PrismaAdapter(prisma),
    
});

