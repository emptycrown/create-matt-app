import models from '~/models';

export const resolvers = {
  Company: {
    ceo: ({ ceoId }) => models.User.findByPk(ceoId),
  },

  Query: {
    companies: () => models.Company.findAll(),
  },

  Mutation: {
    companyCreate: (_, { name }, { uid }) =>
      models.Company.createNew(uid, name),
  },
};
