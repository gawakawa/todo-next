'use server';

import { getServerSession } from 'next-auth';
import Login from './components/Login';
import { authOptions } from '../../lib/auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return <Login />;
};

export default LoginPage;
