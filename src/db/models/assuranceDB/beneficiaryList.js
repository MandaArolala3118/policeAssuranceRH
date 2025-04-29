const { DataTypes } = require('sequelize');
const { assuranceDB } = require('../../connection');
const InsurancePolicy = require('./insurancePolicy');
const Beneficiary = require('./beneficiary');

const BeneficiaryList = assuranceDB.define('BeneficiaryList', {
  insurance_policy_id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    references: {
      model: InsurancePolicy,
      key: 'policy_number'
    }
  },
  beneficiary_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Beneficiary,
      key: 'id'
    }
  }
}, {
  tableName: 'BeneficiaryList',
  timestamps: false
});

// Définir les associations
InsurancePolicy.belongsToMany(Beneficiary, { 
  through: BeneficiaryList,
  foreignKey: 'insurance_policy_id',
  otherKey: 'beneficiary_id',
  as: 'beneficiaries'
});

Beneficiary.belongsToMany(InsurancePolicy, {
  through: BeneficiaryList,
  foreignKey: 'beneficiary_id',
  otherKey: 'insurance_policy_id',
  as: 'policies'
});

module.exports = BeneficiaryList;