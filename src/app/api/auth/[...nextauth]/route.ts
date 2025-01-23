import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account.provider === 'google') {
        const dbUser = await prisma.user.findUnique({
          where: { email: account.email },
        });
        token.isRegistered = !!dbUser;
        token.email = account.email;
      }
      return token;
    },

    async signIn({ user }) {
      if (!user?.email) return false;

      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!dbUser) {
        return '/register';
      }

      return '/dashboard';
    },

    async session({ session, token }) {
      session.isRegistered = token.isRegistered;
      session.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
