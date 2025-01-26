import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token?.email) {
    return NextResponse.json({ isRegistered: false }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  return NextResponse.json({ isRegistered: !!user });
}
