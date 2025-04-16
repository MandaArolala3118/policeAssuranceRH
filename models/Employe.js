// export class Employe {
//     constructor(numeroEmploye, nom, numeroPoliceAssurance, adresse, policeAssurance) {
//       this.numeroEmploye = numeroEmploye
//       this.nom = nom
//       this.numeroPoliceAssurance = numeroPoliceAssurance
//       this.adresse = adresse
//       this.policeAssurance = policeAssurance
//     }
  
//     modifierBeneficiaire(nouveauxBeneficiaires) {
//       this.policeAssurance.listeBeneficiaire = nouveauxBeneficiaires
//     }
//   }
import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize('playground', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // ou 'sqlite', 'postgres', etc.
})
const emp = (sequelize, DataTypes) => {
  const Employe = sequelize.define('Employe', {
    ID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    Nom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    NumeroPoliceAssurance: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Adresse: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'employe',
    timestamps: false
  })
  return Employe
}

export default emp(sequelize, DataTypes)
