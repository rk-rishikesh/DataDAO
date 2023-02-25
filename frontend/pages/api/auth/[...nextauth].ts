import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_ID as string,
      clientSecret: process.env.AUTH_SECRET as string
    })
  ]
};

export default NextAuth(authOptions);
