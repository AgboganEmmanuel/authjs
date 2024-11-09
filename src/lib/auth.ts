import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import GithubProvider from "next-auth/providers/github"

export const { handlers, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GithubProvider]
})