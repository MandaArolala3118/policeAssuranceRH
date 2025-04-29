const employeResolvers = require('./employeResolvers');
const assuranceResolvers = require('./assuranceResolvers');
const rhResolvers = require('./rhResolvers');
const { merge } = require('lodash');

// Fusionner tous les résolveurs
const resolvers = merge({
  // Résolveur de base pour éviter les erreurs avec les types étendus
  Query: {
    _: () => "Base Query"
  },
  Mutation: {
    _: () => "Base Mutation"
  }
}, employeResolvers, assuranceResolvers, rhResolvers);

module.exports = resolvers;