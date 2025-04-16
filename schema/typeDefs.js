import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Employe {
  ID: ID!
  Nom: String
  NumeroPoliceAssurance: String
  Adresse: Int
}

type Query {
  employes: [Employe]
  employe(id: ID!): Employe
}

type Mutation {
  ajouterEmploye(nom: String, numeroPoliceAssurance: String, adresse: Int): Employe
  modifierEmploye(id: ID!, nom: String, numeroPoliceAssurance: String, adresse: Int): Employe
  supprimerEmploye(id: ID!): Boolean
}

`
// type Adresse {
//   rue: String
//   ville: String
// }

// type Employe {
//   id: Int
//   nom: String
//   numeroEmploye: Int
//   adresse: Adresse
//   policeAssurance: PoliceAssurance
// }

// type PoliceAssurance {
//   id: Int
//   numeroPolice: Int
//   titulaire: Employe
//   listeBeneficiaire: [Employe]
// }

// input AdresseInput {
//   rue: String!
//   ville: String!
// }

// type Query {
//   employes: [Employe]
//   policesAssurance: [PoliceAssurance]
// }

// type Mutation {
//   ajouterEmploye(nom: String!, numeroEmploye: Int!, adresse: AdresseInput!): Employe
//   ajouterPoliceAssurance(numeroPolice: Int!, idEmploye: Int!): PoliceAssurance
// }