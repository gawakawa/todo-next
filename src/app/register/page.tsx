'use client';

import { useSession } from 'next-auth/react';

export default function Register() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Register</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
