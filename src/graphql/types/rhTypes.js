const { gql } = require('apollo-server-express');

const rhTypes = gql`
  type HRAdvisor {
    identifier: ID!
  }

  input HRAdvisorInput {
    identifier: ID!
  }

  extend type Query {
    hrAdvisors: [HRAdvisor]
    hrAdvisor(identifier: ID!): HRAdvisor
  }

  extend type Mutation {
    createHRAdvisor(advisor: HRAdvisorInput!): HRAdvisor
    deleteHRAdvisor(identifier: ID!): Boolean
  }
`;

module.exports = rhTypes;