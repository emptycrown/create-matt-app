import connectSequelize from 'connect-session-sequelize';
import firebase from '~/integrations/firebase';
import models from '~/models';
import session from 'express-session';
const SequelizeStore = connectSequelize(session.Store);

// https://www.npmjs.com/package/express-session
// https://www.npmjs.com/package/connect-session-sequelize
export function authorizeApp(app) {
  // express-session here sends cookies over to client for storage
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      store: new SequelizeStore({
        db: models.sequelize,
      }),
      cookie: {
        secure: false,
        // Expires in 100 years
        maxAge: 100 * 365 * 24 * 60 * 60 * 1000,
      },
      resave: false,
      // Saves the session + cookie if it has been modified on the server
      // i.e., only if something modifies req.session then it will be persisted
      saveUninitialized: false,
    })
  );

  app.use(function parseUid(req, res, next) {
    req.uid = req.session.uid || null;
    next();
  });
}

export async function login(req, token) {
  const { uid, email, name } = await firebase.auth().verifyIdToken(token);

  // Currently, you can "login" as a brand new user. In this case, we need to
  // "signup" the user -- i.e. create the user object
  const [user] = await models.User.findOrCreate({
    where: { id: uid },
    defaults: { name, email },
  });

  loginSession(req, user.id);
  return user;
}

// These two functions modify the req.session object, and thus cause
// express-session to save the cookies
export function loginSession(req, uid) {
  console.log('req', req);
  req.session.uid = uid;
}
export function logoutSession(req) {
  delete req.session.uid;
}
