const { DataTypes } = require('sequelize');
const { assuranceDB } = require('../../connection');

const InsurancePolicy = assuranceDB.define('InsurancePolicy', {
  policy_number: {
    type: DataTypes.STRING(50),
    primaryKey: true
  }
}, {
  tableName: 'InsurancePolicy',
  timestamps: false
});

module.exports = InsurancePolicy;