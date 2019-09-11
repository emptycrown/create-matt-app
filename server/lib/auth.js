import connectSequelize from 'connect-session-sequelize';
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

export async function login(req) {
  // TODO: insert authorization logic
  // Call loginSession(req, uid) at the end
}

// These two functions modify the req.session object, and thus cause
// express-session to save the cookies
export function loginSession(req, uid) {
  req.session.uid = uid;
}
export function logoutSession(req) {
  delete req.session.uid;
}
