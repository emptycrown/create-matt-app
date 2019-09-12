import { DEV, ENV } from '#/lib/env';
import firebase from 'firebase-admin';

import devKey from '~/firebaseKeyDev.json';
import prodKey from '~/firebaseKeyProd.json';

// const { FIREBASE_DATABASE_URL } = process.env;
firebase.initializeApp({
  credential: firebase.credential.cert(ENV === DEV ? devKey : prodKey),
  //   databaseURL: FIREBASE_DATABASE_URL,
});

export default firebase;
