export class ConseillerRH {
  constructor(identifiant) {
    this.identifiant = identifiant
  }

  validerIdentite() {
    return true
  }

  enregistrerModification(modification) {
    console.log('Modification enregistrée:', modification)
  }
}
