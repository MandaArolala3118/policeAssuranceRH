const employes = []
const polices = []
let nextId = 1

export const resolvers = {
  Query: {
    employes: () => employes,
    policesAssurance: () => polices,
  },

  Mutation: {
    ajouterEmploye: (_, { nom, numeroEmploye, adresse }) => {
      const nouvelEmploye = {
        id: nextId++,
        nom,
        numeroEmploye,
        adresse,
        policeAssurance: null,
      }
      employes.push(nouvelEmploye)
      return nouvelEmploye
    },

    ajouterPoliceAssurance: (_, { numeroPolice, idEmploye }) => {
      const employe = employes.find(e => e.id === idEmploye)
      if (!employe) throw new Error("Employé introuvable")

      const nouvellePolice = {
        id: polices.length + 1,
        numeroPolice,
        titulaire: employe,
        listeBeneficiaire: [],
      }

      polices.push(nouvellePolice)
      employe.policeAssurance = nouvellePolice
      return nouvellePolice
    }
  }
}
