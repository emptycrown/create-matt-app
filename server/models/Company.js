// Sample model file for a Company
import Sequelize from 'sequelize';

export default class Company extends Sequelize.Model {
  static fields = {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // User id of the company CEO
    ceoId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  };

  static options = {
    indexes: [
      {
        fields: ['name'],
      },
    ],
  };

  static associate(models) {
    this.belongsTo(models.User, {
      as: 'ceo',
      foreignKey: 'ceoId',
    });
  }

  // Sample static functions on model
  static functions = models => ({
    companiesOfUser: async uid =>
      models.Company.findAll({
        where: { ceoId: uid },
      }),

    createNew: async (uid, name, url = 'https://cresicor.com') => {
      const [company] = await Promise.all([
        models.Company.create({
          name,
          url,
          ceoId: uid,
        }),
        models.User.increment({ clout: 1 }, { where: { id: uid } }),
      ]);
      return company;
    },
  });
}
