import React from 'react';

import { useSignupOrLogin } from '~/lib/auth';

export default function SignupPage() {
  const signupOrLogin = useSignupOrLogin();
  return (
    <button onClick={() => signupOrLogin('GOOGLE')}>Signup with Google</button>
  );
}
