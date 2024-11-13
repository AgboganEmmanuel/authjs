import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { hashPassword } from "@/utils/password"

async function getUserFromDb(email: string, passwordHash: string) {
    return await prisma.user.findFirst({
      where: {
        email: email,
        hashedPassword: passwordHash
      }
    });
  }

export const { handlers, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GithubProvider,
        //setup de credentials
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
              email: {},
              password: {},
            },
            authorize: async (credentials) => {
              let user = null
       
              // logic to salt and hash password
              if (!credentials?.email || typeof credentials.email !== 'string') {
                throw new Error("Email invalide")
              }
              if (!credentials?.password || typeof credentials.password !== 'string') {
                throw new Error("Mot de passe invalide")
            }
              const pwHash = await hashPassword(credentials.password)
       
              // logic to verify if the user exists
              user = await getUserFromDb(credentials.email, pwHash)
       
              if (!user) {
                // No user found, so this is their first attempt to login
                // Optionally, this is also the place you could do a user registration
                throw new Error("Invalid credentials.")
              }
       
              // return user object with their profile data
              return user
            },
          }),
          //setup de credentials
    ]
})