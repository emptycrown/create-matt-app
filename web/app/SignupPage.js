import React, { useEffect, useState } from 'react';

import { BrandName, Button, Card, Text } from '~/components';
import { Redirect } from 'react-router-dom';
import { useMe, useSignupOrLogin } from '~/lib/auth';

function Signup() {
  const { me } = useMe();
  const [mode, setMode] = useState('LOGIN');
  const showPrimaryTheme = mode === 'LOGIN';
  const signupOrLogin = useSignupOrLogin();
  const [redirectUrl, setRedirectUrl] = useState('/');

  useEffect(() => {
    if (me) return <Redirect to={`${redirectUrl}`} />;
  }, [me]);

  return (
    <div className="w-screen h-screen text-white overflow-hidden bg-gray-100 center-contents">
      <BrandName className="text-center" style={{ top: 100 }} />
      <Card.Standard
        style={{
          width: 300,
          height: 550,
          background: 'white',
          position: 'relative',
        }}
      >
        <div
          className="absolute"
          style={{
            zIndex: -1,
            transition: 'all .4s ease-out',
            transform: showPrimaryTheme
              ? 'translate(30%,0%) scale(2) rotate(-30deg)'
              : 'translate(-30%,55%) scale(3.6) rotate(45deg)',
          }}
        >
          <img src="/static/graphics/signup-blob1.svg" />
        </div>
        <div
          className="absolute"
          style={{
            zIndex: -1,
            transition: 'all .4s ease-out',
            transform: showPrimaryTheme
              ? 'translate(0%,-30%) scale(3) rotate(20deg)'
              : 'translate(0%,-20%) scale(3.5) rotate(15deg)',
          }}
        >
          <img src="/static/graphics/signup-blob3.svg" />
        </div>
        <div
          className="absolute"
          style={{
            zIndex: -1,
            transition: 'all .4s ease-out',
            transform: showPrimaryTheme
              ? 'translate(-30%,-60%) scale(1.8) rotate(30deg)'
              : 'translate(0%,-90%) scale(2.5) rotate(50deg)',
          }}
        >
          <img src="/static/graphics/signup-blob2.svg" />
        </div>

        <div className="p-4">
          <div className="title text-4xl py-12">
            {mode === 'LOGIN' ? 'Welcome back' : 'Create account'}
          </div>
          <Button.GoogleAuth
            primary={showPrimaryTheme}
            onClick={() => signupOrLogin('GOOGLE', { fromUrl: redirectUrl })}
          >
            Use Google
          </Button.GoogleAuth>
          <Button.FacebookAuth
            primary={showPrimaryTheme}
            onClick={() => signupOrLogin('FACEBOOK', { fromUrl: redirectUrl })}
          >
            Use Facebook
          </Button.FacebookAuth>
        </div>
        <div
          className="absolute text-blue-500 font-bold text-lg"
          style={{ left: '50%', bottom: 24, transform: 'translateX(-50%)' }}
        >
          <Text.Link
            onClick={() => {
              if (mode === 'LOGIN') setMode('SIGNUP');
              else setMode('LOGIN');
            }}
          >
            {mode === 'LOGIN' ? 'Sign up' : 'Log in'}
          </Text.Link>
        </div>
      </Card.Standard>
    </div>
  );
}

export default Signup;
