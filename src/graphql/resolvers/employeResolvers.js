const { Adresse, Employe } = require('../../db/models');
const { InsurancePolicy } = require('../../db/models');

const employeResolvers = {
  Query: {
    // Requêtes pour les employés
    employes: async () => {
      return await Employe.findAll();
    },
    employe: async (_, { employee_number }) => {
      return await Employe.findByPk(employee_number);
    },
    
    // Requêtes pour les adresses
    adresses: async () => {
      return await Adresse.findAll();
    },
    adresse: async (_, { id }) => {
      return await Adresse.findByPk(id);
    }
  },
  
  Mutation: {
    // Mutations pour les adresses
    createAdresse: async (_, { adresse }) => {
      return await Adresse.create(adresse);
    },
    updateAdresse: async (_, { id, adresse }) => {
      const existingAdresse = await Adresse.findByPk(id);
      if (!existingAdresse) {
        throw new Error(`Adresse avec ID ${id} non trouvée`);
      }
      
      await existingAdresse.update(adresse);
      return existingAdresse;
    },
    deleteAdresse: async (_, { id }) => {
      const existingAdresse = await Adresse.findByPk(id);
      if (!existingAdresse) {
        throw new Error(`Adresse avec ID ${id} non trouvée`);
      }
      
      await existingAdresse.destroy();
      return true;
    },
    
    // Mutations pour les employés
    createEmploye: async (_, { employe }) => {
      return await Employe.create(employe);
    },
    updateEmploye: async (_, { employee_number, employe }) => {
      const existingEmploye = await Employe.findByPk(employee_number);
      if (!existingEmploye) {
        throw new Error(`Employé avec ID ${employee_number} non trouvé`);
      }
      
      await existingEmploye.update(employe);
      return existingEmploye;
    },
    deleteEmploye: async (_, { employee_number }) => {
      const existingEmploye = await Employe.findByPk(employee_number);
      if (!existingEmploye) {
        throw new Error(`Employé avec ID ${employee_number} non trouvé`);
      }
      
      await existingEmploye.destroy();
      return true;
    }
  },
  
  // Résolveurs de champs pour les types composés
  Employe: {
    address: async (employe) => {
      if (!employe.address_id) return null;
      return await Adresse.findByPk(employe.address_id);
    },
    insurancePolicy: async (employe) => {
      if (!employe.insurance_policy_number) return null;
      return await InsurancePolicy.findByPk(employe.insurance_policy_number);
    }
  }
};

module.exports = employeResolvers;