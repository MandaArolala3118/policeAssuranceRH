import { employes } from '../data/fakeData.js'

export const resolvers = {
  Query: {
    employes: () => employes
  },
  Employe: {
    policeAssurance: (parent) => parent.policeAssurance,
    adresse: (parent) => parent.adresse
  }
}
