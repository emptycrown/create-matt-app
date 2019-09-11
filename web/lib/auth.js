import { message } from 'antd';
import { useEffect } from 'react';
import firebase, { initialize } from '~/integrations/firebase';

// TODO: add appropriate providers
const PROVIDERS = {
  GOOGLE: () => new firebase.auth.GoogleAuthProvider(),
  FACEBOOK: () => new firebase.auth.FacebookAuthProvider(),
};

export function useAuth() {
  useEffect(() => {
    initialize();
  }, []);
}

// https://firebase.google.com/docs/auth/web/facebook-login?#handling-account-exists-with-different-credential-errors
// i.e. when I sign up with Google but already have Facebook linked
// TODO: add appropriate providers
const CREDENTIAL_METHOD_TO_SITE = {
  'google.com': 'Google',
  'facebook.com': 'Facebook',
};
async function handleAccountExistsWithDifferentCredential(email) {
  const method = (await firebase.auth().fetchSignInMethodsForEmail(email))[0];
  const site = CREDENTIAL_METHOD_TO_SITE[method];
  message.warn(
    `You've already signed up before -- try logging in with ${site}!`
  );
}

export async function signupOrLogin(provider) {
  try {
    await firebase.auth().signInWithPopup(PROVIDERS[provider]());
  } catch (err) {
    if (err.code === 'auth/account-exists-with-different-credential') {
      handleAccountExistsWithDifferentCredential(err.email);
      return;
    } else {
      throw err;
    }
  }

  await firebase.auth().currentUser.getIdToken();
}

export async function logout() {
  await firebase.auth().signOut();
  location.reload();
}
