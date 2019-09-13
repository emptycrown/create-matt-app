import React from 'react';

import { useLogout, useSignupOrLogin } from '~/lib/auth';
import { useMe } from '~/lib/auth';

export default function SignupPage() {
  const signupOrLogin = useSignupOrLogin();
  const logout = useLogout();
  const { me } = useMe();

  return (
    <div>
      {me ? (
        <div>
          {me?.name} ({me?.email})
        </div>
      ) : (
        <div>not logged in</div>
      )}
      <div>
        <button onClick={() => signupOrLogin('GOOGLE')}>
          Signup with Google
        </button>
      </div>
      <div>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
}
