const { gql } = require('apollo-server-express');
const employeTypes = require('./types/employeTypes');
const assuranceTypes = require('./types/assuranceTypes');
const rhTypes = require('./types/rhTypes');

// Schéma de base avec les types Query et Mutation
const baseSchema = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

// Combiner tous les schémas
const schema = [baseSchema, employeTypes, assuranceTypes, rhTypes];

module.exports = schema;