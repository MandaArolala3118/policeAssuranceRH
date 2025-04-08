export class Employe {
    constructor(numeroEmploye, nom, numeroPoliceAssurance, adresse, policeAssurance) {
      this.numeroEmploye = numeroEmploye
      this.nom = nom
      this.numeroPoliceAssurance = numeroPoliceAssurance
      this.adresse = adresse
      this.policeAssurance = policeAssurance
    }
  
    modifierBeneficiaire(nouveauxBeneficiaires) {
      this.policeAssurance.listeBeneficiaire = nouveauxBeneficiaires
    }
  }
  