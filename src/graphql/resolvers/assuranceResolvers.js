const { 
    InsuranceCompany, 
    InsurancePolicy, 
    Beneficiary, 
    PrimaryBeneficiary, 
    BeneficiaryList,
    Employe
  } = require('../../db/models');
  
  const assuranceResolvers = {
    Query: {
      // Requêtes pour les compagnies d'assurance
      insuranceCompanies: async () => {
        return await InsuranceCompany.findAll();
      },
      insuranceCompany: async (_, { id }) => {
        return await InsuranceCompany.findByPk(id);
      },
      
      // Requêtes pour les polices d'assurance
      insurancePolicies: async () => {
        return await InsurancePolicy.findAll();
      },
      insurancePolicy: async (_, { policy_number }) => {
        return await InsurancePolicy.findByPk(policy_number);
      },
      
      // Requêtes pour les bénéficiaires
      beneficiaries: async () => {
        return await Beneficiary.findAll();
      },
      beneficiary: async (_, { id }) => {
        return await Beneficiary.findByPk(id);
      }
    },
    
    Mutation: {
      // Mutations pour les compagnies d'assurance
      createInsuranceCompany: async (_, { company }) => {
        return await InsuranceCompany.create(company);
      },
      updateInsuranceCompany: async (_, { id, company }) => {
        const existingCompany = await InsuranceCompany.findByPk(id);
        if (!existingCompany) {
          throw new Error(`Compagnie d'assurance avec ID ${id} non trouvée`);
        }
        
        await existingCompany.update(company);
        return existingCompany;
      },
      deleteInsuranceCompany: async (_, { id }) => {
        const existingCompany = await InsuranceCompany.findByPk(id);
        if (!existingCompany) {
          throw new Error(`Compagnie d'assurance avec ID ${id} non trouvée`);
        }
        
        await existingCompany.destroy();
        return true;
      },
      
      // Mutations pour les polices d'assurance
      createInsurancePolicy: async (_, { policy }) => {
        return await InsurancePolicy.create(policy);
      },
      deleteInsurancePolicy: async (_, { policy_number }) => {
        const existingPolicy = await InsurancePolicy.findByPk(policy_number);
        if (!existingPolicy) {
          throw new Error(`Police d'assurance avec numéro ${policy_number} non trouvée`);
        }
        
        await existingPolicy.destroy();
        return true;
      },
      
      // Mutations pour les bénéficiaires
      createBeneficiary: async (_, { beneficiary }) => {
        return await Beneficiary.create(beneficiary);
      },
      updateBeneficiary: async (_, { id, beneficiary }) => {
        const existingBeneficiary = await Beneficiary.findByPk(id);
        if (!existingBeneficiary) {
          throw new Error(`Bénéficiaire avec ID ${id} non trouvé`);
        }
        
        await existingBeneficiary.update(beneficiary);
        return existingBeneficiary;
      },
      deleteBeneficiary: async (_, { id }) => {
        const existingBeneficiary = await Beneficiary.findByPk(id);
        if (!existingBeneficiary) {
          throw new Error(`Bénéficiaire avec ID ${id} non trouvé`);
        }
        
        await existingBeneficiary.destroy();
        return true;
      },
      
      // Mutations pour les associations entre polices et bénéficiaires
      addPrimaryBeneficiary: async (_, { policy_number, beneficiary_id }) => {
        try {
          await PrimaryBeneficiary.create({
            insurance_policy_id: policy_number,
            beneficiary_id
          });
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      removePrimaryBeneficiary: async (_, { policy_number, beneficiary_id }) => {
        try {
          const count = await PrimaryBeneficiary.destroy({
            where: {
              insurance_policy_id: policy_number,
              beneficiary_id
            }
          });
          return count > 0;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      
      addBeneficiaryToList: async (_, { policy_number, beneficiary_id }) => {
        try {
          await BeneficiaryList.create({
            insurance_policy_id: policy_number,
            beneficiary_id
          });
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      removeBeneficiaryFromList: async (_, { policy_number, beneficiary_id }) => {
        try {
          const count = await BeneficiaryList.destroy({
            where: {
              insurance_policy_id: policy_number,
              beneficiary_id
            }
          });
          return count > 0;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
    },
    
    // Résolveurs de champs pour les types composés
    InsurancePolicy: {
      primaryBeneficiaries: async (policy) => {
        return await policy.getPrimaryBeneficiaries();
      },
      beneficiaries: async (policy) => {
        return await policy.getBeneficiaries();
      },
      employe: async (policy) => {
        return await Employe.findOne({
          where: { insurance_policy_number: policy.policy_number }
        });
      }
    },
    
    Beneficiary: {
      primaryPolicies: async (beneficiary) => {
        return await beneficiary.getPrimaryPolicies();
      },
      policies: async (beneficiary) => {
        return await beneficiary.getPolicies();
      }
    }
  };
  
  module.exports = assuranceResolvers;