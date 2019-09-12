import { login as _login, logoutSession } from '~/lib/auth';
import models from '~/models';

export const resolvers = {
  Query: {
    me: (_, __, { uid }) => models.User.findByPk(uid),
  },

  Mutation: {
    login: (_, { token }, { req }) => _login(req, token),

    logout: (_, __, { req }) => logoutSession(req),
  },
};
