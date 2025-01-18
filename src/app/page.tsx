// src/app/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Logout from './components/Logout';
import Image from 'next/image';

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  if (status === 'loading') {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto pt-20 px-4'>
        <div className='bg-white rounded-xl shadow-lg p-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-6'>マイページ</h1>
          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              {session.user?.image && (
                <Image src={session.user.image} alt='Profile' className='w-16 h-16 rounded-full' />
              )}
              <div>
                <p className='text-xl font-medium text-gray-900'>
                  ようこそ、{session.user?.name}さん
                </p>
                <p className='text-sm text-gray-500'>{session.user?.email}</p>
              </div>
            </div>
            <div className='pt-4 border-t border-gray-200'>
              <p className='text-sm text-gray-600'>
                セッションの期限：{new Date(session.expires).toLocaleString('ja-JP')}
              </p>
            </div>
          </div>
        </div>
        <Logout />
      </div>
    </div>
  );
}
