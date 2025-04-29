const { DataTypes } = require('sequelize');
const { assuranceDB } = require('../../connection');
const InsurancePolicy = require('./insurancePolicy');
const Beneficiary = require('./beneficiary');

const PrimaryBeneficiary = assuranceDB.define('PrimaryBeneficiary', {
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
  tableName: 'PrimaryBeneficiary',
  timestamps: false
});

// Définir les associations
InsurancePolicy.belongsToMany(Beneficiary, { 
  through: PrimaryBeneficiary,
  foreignKey: 'insurance_policy_id',
  otherKey: 'beneficiary_id',
  as: 'primaryBeneficiaries'
});

Beneficiary.belongsToMany(InsurancePolicy, {
  through: PrimaryBeneficiary,
  foreignKey: 'beneficiary_id',
  otherKey: 'insurance_policy_id',
  as: 'primaryPolicies'
});

module.exports = PrimaryBeneficiary;