// Sync MySQL schema
// TODO: more options, better parsing

import models from './index';
import session from 'express-session';
import connectSequelize from 'connect-session-sequelize';
// For syncing Session table
const SequelizeStore = connectSequelize(session.Store);
const sessionStore = new SequelizeStore({
  db: models.sequelize,
});

const options = {};
if (process.argv[2] === 'alter') options.alter = true;

models.sequelize.sync(options);
sessionStore.sync();
