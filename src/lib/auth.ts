import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { comparePassword } from "@/utils/password"

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
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
        //setup de credentials
        Credentials({
          credentials: {
              email: { label: "Email", type: "email" },
              password: { label: "Mot de passe", type: "password" }
          },
          async authorize(credentials) {
              if (!credentials?.email || !credentials?.password) {
                  throw new Error('Email et mot de passe requis');
              }

              const user = await prisma.user.findUnique({
                  where: { email: credentials.email as string }
              });

              if (!user || !user.hashedPassword) {
                  throw new Error('Aucun utilisateur trouvé avec cet email');
              }

              const isPasswordValid = await comparePassword(
                  credentials.password as string,
                  user.hashedPassword
              );

              if (!isPasswordValid) {
                  throw new Error('Mot de passe incorrect');
              }

              return {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  image: user.image
              };
          }
      })
  ],
  pages: {
    signIn: '/auth/login',
},
callbacks: {
    async signIn({ user, account, profile }) {
        console.log('Tentative de connexion:', { user, account, profile });
        return true;
    }
},
session:{
  strategy: "jwt",
},
debug: true
})