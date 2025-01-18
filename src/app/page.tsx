'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Home = () => {
  const { status } = useSession();

  useEffect(() => {
    status === 'authenticated' && redirect('/todo');
    status === 'unauthenticated' && redirect('/login');
  }, [status]);

  return null;
};

export default Home;
