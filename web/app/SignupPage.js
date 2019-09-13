import React from 'react';

import { Link } from 'react-router-dom';
import { useSignupOrLogin } from '~/lib/auth';

export default function SignupPage() {
  const signupOrLogin = useSignupOrLogin();

  return (
    <div>
      <div>Please login/signup!</div>
      <div>
        <Link to="/">Go back home</Link>
      </div>
      <div>
        <button onClick={() => signupOrLogin('GOOGLE')}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
