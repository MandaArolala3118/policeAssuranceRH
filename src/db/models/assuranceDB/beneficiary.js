const { DataTypes } = require('sequelize');
const { assuranceDB } = require('../../connection');

const Beneficiary = assuranceDB.define('Beneficiary', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'Beneficiary',
  timestamps: false
});

module.exports = Beneficiary;