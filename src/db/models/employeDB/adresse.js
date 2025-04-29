const { DataTypes } = require('sequelize');
const { employeDB } = require('../../connection');

const Adresse = employeDB.define('Adresse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  street: {
    type: DataTypes.STRING(255)
  },
  city: {
    type: DataTypes.STRING(100)
  },
  postal_code: {
    type: DataTypes.STRING(20)
  }
}, {
  tableName: 'Adresse',
  timestamps: false
});

module.exports = Adresse;