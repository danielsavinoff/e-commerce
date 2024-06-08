import NextAuth from "next-auth"
import Keycloak from 'next-auth/providers/keycloak'
import { decode, type JwtPayload } from 'jsonwebtoken' 
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & { roles?: string[] }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Keycloak],
  callbacks: {
    jwt({ token, account }) {
      if (account?.access_token) {
        const payload = decode(account.access_token) as JwtPayload

        const roles: undefined | string[] = payload?.realm_access?.roles

        if (roles) token.roles = roles
      }
      
      return token
    },
    session({ session, token }) {
      session.user.roles = token.roles as undefined | string[]
      
      return session
    }
  }
})