import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 未認証時の処理
  if (!token) {
    // /login のみアクセス可能
    if (path === '/login') {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', request.url));
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email ?? undefined },
  });

  // 認証済み・未登録時の処理
  if (!user) {
    // /register と /login のみアクセス可能
    if (path in ['/register', '/login']) {
      return NextResponse.next();
    }
    
    return NextResponse.redirect(new URL('/register', request.url));
  }

  // 登録済みユーザーは /login にアクセスできない
  if (user && path === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
