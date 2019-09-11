import React from 'react';

import { signupOrLogin } from '~/lib/auth';

export default function SignupPage() {
  return <button onClick={() => signupOrLogin('GOOGLE')}>Signup here</button>;
}
