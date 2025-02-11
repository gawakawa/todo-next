'use client';

import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md'
    >
      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
        />
      </svg>
      ログアウト
    </button>
  );
};

export default LogoutButton;
