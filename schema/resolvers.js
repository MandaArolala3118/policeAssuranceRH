// const employes = []
// const polices = []
// let nextId = 1

// export const resolvers = {
//   Query: {
//     employes: () => employes,
//     policesAssurance: () => polices,
//   },

//   Mutation: {
//     ajouterEmploye: (_, { nom, numeroEmploye, adresse }) => {
//       const nouvelEmploye = {
//         id: nextId++,
//         nom,
//         numeroEmploye,
//         adresse,
//         policeAssurance: null,
//       }
//       employes.push(nouvelEmploye)
//       return nouvelEmploye
//     },

//     ajouterPoliceAssurance: (_, { numeroPolice, idEmploye }) => {
//       const employe = employes.find(e => e.id === idEmploye)
//       if (!employe) throw new Error("Employé introuvable")

//       const nouvellePolice = {
//         id: polices.length + 1,
//         numeroPolice,
//         titulaire: employe,
//         listeBeneficiaire: [],
//       }

//       polices.push(nouvellePolice)
//       employe.policeAssurance = nouvellePolice
//       return nouvellePolice
//     }
//   }
// }
import { v4 as uuidv4 } from 'uuid' // Pour générer des IDs uniques

import Employe from '../models/Employe.js'

export const resolvers = {
  Query: {
    employes: async () => {
      return await Employe.findAll()
    },
    employe: async (_, { id }) => {
      return await Employe.findByPk(id)
    },
  },

  Mutation: {
    ajouterEmploye: async (_, { nom, numeroPoliceAssurance, adresse }) => {
      const nouvelEmploye = await Employe.create({
        ID: uuidv4(),
        Nom: nom,
        NumeroPoliceAssurance: numeroPoliceAssurance,
        Adresse: adresse
      })
      return nouvelEmploye
    },

    modifierEmploye: async (_, { id, nom, numeroPoliceAssurance, adresse }) => {
      const employe = await Employe.findByPk(id)
      if (!employe) throw new Error('Employé introuvable')
      employe.Nom = nom ?? employe.Nom
      employe.NumeroPoliceAssurance = numeroPoliceAssurance ?? employe.NumeroPoliceAssurance
      employe.Adresse = adresse ?? employe.Adresse
      await employe.save()
      return employe
    },

    supprimerEmploye: async (_, { id }) => {
      const employe = await Employe.findByPk(id)
      if (!employe) throw new Error('Employé introuvable')
      await employe.destroy()
      return true
    }
  }
}
