// Sample model file for a User
import Sequelize from 'sequelize';

export default class User extends Sequelize.Model {
  static fields = {
    id: {
      primaryKey: true,
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  };

  static options = {
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
  };
}
