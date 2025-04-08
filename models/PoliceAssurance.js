export class PoliceAssurance {
  constructor(numeroPolice, beneficiairePrincipal, listeBeneficiaire) {
    this.numeroPolice = numeroPolice
    this.beneficiairePrincipal = beneficiairePrincipal
    this.listeBeneficiaire = listeBeneficiaire
  }

  changerBeneficiaire(nouvelleListe) {
    this.listeBeneficiaire = nouvelleListe
  }
}
