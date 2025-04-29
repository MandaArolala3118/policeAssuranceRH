const { gql } = require('apollo-server-express');

const employeTypes = gql`
  type Adresse {
    id: ID!
    street: String
    city: String
    postal_code: String
  }

  type Employe {
    employee_number: ID!
    name: String
    insurance_policy_number: String
    address: Adresse
    insurancePolicy: InsurancePolicy
  }

  input AdresseInput {
    street: String!
    city: String!
    postal_code: String!
  }

  input EmployeInput {
    employee_number: ID!
    name: String!
    insurance_policy_number: String
    address_id: Int
  }

  input EmployeUpdateInput {
    name: String
    insurance_policy_number: String
    address_id: Int
  }

  extend type Query {
    employes: [Employe]
    employe(employee_number: ID!): Employe
    adresses: [Adresse]
    adresse(id: ID!): Adresse
  }

  extend type Mutation {
    createAdresse(adresse: AdresseInput!): Adresse
    updateAdresse(id: ID!, adresse: AdresseInput!): Adresse
    deleteAdresse(id: ID!): Boolean
    
    createEmploye(employe: EmployeInput!): Employe
    updateEmploye(employee_number: ID!, employe: EmployeUpdateInput!): Employe
    deleteEmploye(employee_number: ID!): Boolean
  }
`;

module.exports = employeTypes;