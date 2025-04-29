const { HRAdvisor } = require('../../db/models');

const rhResolvers = {
  Query: {
    // Requêtes pour les conseillers RH
    hrAdvisors: async () => {
      return await HRAdvisor.findAll();
    },
    hrAdvisor: async (_, { identifier }) => {
      return await HRAdvisor.findByPk(identifier);
    }
  },
  
  Mutation: {
    // Mutations pour les conseillers RH
    createHRAdvisor: async (_, { advisor }) => {
      return await HRAdvisor.create(advisor);
    },
    deleteHRAdvisor: async (_, { identifier }) => {
      const existingAdvisor = await HRAdvisor.findByPk(identifier);
      if (!existingAdvisor) {
        throw new Error(`Conseiller RH avec identifiant ${identifier} non trouvé`);
      }
      
      await existingAdvisor.destroy();
      return true;
    }
  }
};

module.exports = rhResolvers;