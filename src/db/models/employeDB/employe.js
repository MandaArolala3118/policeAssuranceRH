const { DataTypes } = require('sequelize');
const { employeDB } = require('../../connection');
const Adresse = require('./adresse');

const Employe = employeDB.define('Employe', {
  employee_number: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255)
  },
  insurance_policy_number: {
    type: DataTypes.STRING(50)
  },
  address_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Adresse,
      key: 'id'
    }
  }
}, {
  tableName: 'Employe',
  timestamps: false
});

// Définir les associations
Employe.belongsTo(Adresse, { foreignKey: 'address_id', as: 'address' });

module.exports = Employe;