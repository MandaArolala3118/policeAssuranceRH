// Import des modèles EmployeDB
const Adresse = require('./employeDB/adresse');
const Employe = require('./employeDB/employe');

// Import des modèles AssuranceDB
const InsuranceCompany = require('./assuranceDB/insuranceCompany');
const InsurancePolicy = require('./assuranceDB/insurancePolicy');
const Beneficiary = require('./assuranceDB/beneficiary');
const PrimaryBeneficiary = require('./assuranceDB/primaryBeneficiary');
const BeneficiaryList = require('./assuranceDB/beneficiaryList');

// Import des modèles RHDB
const HRAdvisor = require('./rhDB/hrAdvisor');

module.exports = {
  // EmployeDB
  Adresse,
  Employe,
  
  // AssuranceDB
  InsuranceCompany,
  InsurancePolicy,
  Beneficiary,
  PrimaryBeneficiary,
  BeneficiaryList,
  
  // RHDB
  HRAdvisor
};