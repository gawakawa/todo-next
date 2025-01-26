'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Home = () => {
  const { data, status } = useSession();

  useEffect(() => {
    status === 'authenticated' && !data.user?.email && redirect('/register');
    status === 'authenticated' && data.user?.email && redirect('/dashboard');
    status === 'unauthenticated' && redirect('/login');
  }, [data, status]);

  return null;
};

export default Home;
