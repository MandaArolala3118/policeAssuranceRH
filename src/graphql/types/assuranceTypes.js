const { gql } = require('apollo-server-express');

const assuranceTypes = gql`
  type InsuranceCompany {
    id: ID!
    name: String
  }

  type InsurancePolicy {
    policy_number: ID!
    primaryBeneficiaries: [Beneficiary]
    beneficiaries: [Beneficiary]
    employe: Employe
  }

  type Beneficiary {
    id: ID!
    name: String
    primaryPolicies: [InsurancePolicy]
    policies: [InsurancePolicy]
  }

  input InsuranceCompanyInput {
    name: String!
  }

  input InsurancePolicyInput {
    policy_number: ID!
  }

  input BeneficiaryInput {
    name: String!
  }

  extend type Query {
    insuranceCompanies: [InsuranceCompany]
    insuranceCompany(id: ID!): InsuranceCompany
    insurancePolicies: [InsurancePolicy]
    insurancePolicy(policy_number: ID!): InsurancePolicy
    beneficiaries: [Beneficiary]
    beneficiary(id: ID!): Beneficiary
  }

  extend type Mutation {
    createInsuranceCompany(company: InsuranceCompanyInput!): InsuranceCompany
    updateInsuranceCompany(id: ID!, company: InsuranceCompanyInput!): InsuranceCompany
    deleteInsuranceCompany(id: ID!): Boolean
    
    createInsurancePolicy(policy: InsurancePolicyInput!): InsurancePolicy
    deleteInsurancePolicy(policy_number: ID!): Boolean
    
    createBeneficiary(beneficiary: BeneficiaryInput!): Beneficiary
    updateBeneficiary(id: ID!, beneficiary: BeneficiaryInput!): Beneficiary
    deleteBeneficiary(id: ID!): Boolean
    
    addPrimaryBeneficiary(policy_number: ID!, beneficiary_id: ID!): Boolean
    removePrimaryBeneficiary(policy_number: ID!, beneficiary_id: ID!): Boolean
    
    addBeneficiaryToList(policy_number: ID!, beneficiary_id: ID!): Boolean
    removeBeneficiaryFromList(policy_number: ID!, beneficiary_id: ID!): Boolean
  }
`;

module.exports = assuranceTypes;