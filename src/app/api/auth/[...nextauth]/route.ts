import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

 declare module 'next-auth' {
   interface Session extends DefaultSession {
     user: {
       id: string;
       email: string;
     } & DefaultSession['user'];
   }
 }

  declare module 'next-auth/jwt' {
    interface JWT {
      id: string;
      email: string;
    }
  }

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user && user?.email) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
      }

      return session;
    },

    async signIn({ account }) {
      if (!account || account.provider !== 'google') {
        return false;
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };