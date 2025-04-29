const { DataTypes } = require('sequelize');
const { assuranceDB } = require('../../connection');

const InsuranceCompany = assuranceDB.define('InsuranceCompany', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'InsuranceCompany',
  timestamps: false
});

module.exports = InsuranceCompany;