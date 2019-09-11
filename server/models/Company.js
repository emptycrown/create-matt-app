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
      type: Sequelize.UUID,
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
  });
}
