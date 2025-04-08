export class CompanieAssurance {
  constructor(nom) {
    this.nom = nom
  }

  recevoirAvisChangement() {
    console.log('Avis de changement reçu par', this.nom)
  }
}
