import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Adresse {
    rue: String
    ville: String
    codePostale: String
  }

  type Beneficiaire {
    nom: String
  }

  type PoliceAssurance {
    numeroPolice: String
    beneficiairePrincipal: Beneficiaire
    listeBeneficiaire: [Beneficiaire]
  }

  type Employe {
    numeroEmploye: String
    nom: String
    numeroPoliceAssurance: String
    policeAssurance: PoliceAssurance
    adresse: Adresse
  }

  type Query {
    employes: [Employe]
  }

`;


