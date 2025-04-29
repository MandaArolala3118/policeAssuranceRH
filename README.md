# API GraphQL Multi-Base de Données

Ce projet est une API GraphQL permettant d'interagir avec trois bases de données MySQL distinctes : EmployeDB, AssuranceDB et RHDB.

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Structure du projet](#structure-du-projet)
- [Base de données](#base-de-données)
- [Utilisation de l'API GraphQL](#utilisation-de-lapi-graphql)
- [Exemples de requêtes](#exemples-de-requêtes)

## Prérequis

- Node.js (v14 ou supérieur)
- MySQL (v5.7 ou supérieur)
- Les bases de données EmployeDB, AssuranceDB et RHDB créées avec le schéma approprié

## Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/MandaArolala3118/policeAssuranceRH
   cd policeAssuranceRH
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

## Configuration

1. Créez un fichier `.env` à la racine du projet (ou modifiez celui existant) :
   ```
   # Configuration des bases de données
   DB_HOST=localhost
   DB_USERNAME=votre_utilisateur
   DB_PASSWORD=votre_mot_de_passe
   DB_PORT=3306

   # Noms des bases de données
   EMPLOYE_DB=EmployeDB
   ASSURANCE_DB=AssuranceDB
   RH_DB=RHDB

   # Configuration du serveur
   PORT=4000
   ```

2. Assurez-vous que les bases de données existent avec le schéma approprié. Si ce n'est pas le cas, exécutez le script SQL fourni pour créer les tables.

## Démarrage

1. Démarrez le serveur :
   ```bash
   npm start
   ```

2. Pour le développement, vous pouvez utiliser :
   ```bash
   npm run dev
   ```

3. L'API GraphQL sera disponible à l'adresse `http://localhost:4000/graphql`

## Structure du projet

```
project-root/
├── src/
│   ├── db/
│   │   ├── config.js            // Configuration de la base de données
│   │   ├── connection.js        // Connexion aux bases de données
│   │   └── models/              // Modèles Sequelize pour chaque table
│   │       ├── employeDB/       // Modèles pour EmployeDB
│   │       ├── assuranceDB/     // Modèles pour AssuranceDB
│   │       └── rhDB/            // Modèles pour RHDB
│   ├── graphql/
│   │   ├── schema.js            // Schéma GraphQL principal
│   │   ├── types/               // Types GraphQL
│   │   └── resolvers/           // Résolveurs GraphQL
│   └── index.js                 // Point d'entrée de l'application
├── package.json
└── .env                         // Variables d'environnement
```

## Base de données

   ```sql
   -- Create the databases
CREATE DATABASE IF NOT EXISTS EmployeDB;
CREATE DATABASE IF NOT EXISTS AssuranceDB;
CREATE DATABASE IF NOT EXISTS RHDB;

-- ============================
-- EmployeDB Database
-- ============================
USE EmployeDB;

CREATE TABLE IF NOT EXISTS Adresse (
    id INT AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Employe (
    employee_number VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255),
    insurance_policy_number VARCHAR(50), -- Logical link to AssuranceDB.PoliceAssurance
    address_id INT,
    FOREIGN KEY (address_id) REFERENCES Adresse(id)
);

-- ============================
-- AssuranceDB Database
-- ============================
USE AssuranceDB;

CREATE TABLE IF NOT EXISTS InsuranceCompany (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS InsurancePolicy (
    policy_number VARCHAR(50) PRIMARY KEY
    -- You can add insurance_company_id if needed
);

CREATE TABLE IF NOT EXISTS Beneficiary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PrimaryBeneficiary (
    insurance_policy_id VARCHAR(50),
    beneficiary_id INT,
    PRIMARY KEY (insurance_policy_id, beneficiary_id),
    FOREIGN KEY (insurance_policy_id) REFERENCES InsurancePolicy(policy_number),
    FOREIGN KEY (beneficiary_id) REFERENCES Beneficiary(id)
);

CREATE TABLE IF NOT EXISTS BeneficiaryList (
    insurance_policy_id VARCHAR(50),
    beneficiary_id INT,
    PRIMARY KEY (insurance_policy_id, beneficiary_id),
    FOREIGN KEY (insurance_policy_id) REFERENCES InsurancePolicy(policy_number),
    FOREIGN KEY (beneficiary_id) REFERENCES Beneficiary(id)
);

-- ============================
-- RHDB Database
-- ============================
USE RHDB;

CREATE TABLE IF NOT EXISTS HRAdvisor (
    identifier VARCHAR(50) PRIMARY KEY
);

-- ============================
-- End of script
-- ============================
```

## Utilisation de l'API GraphQL

L'API GraphQL offre une interface unique pour interroger et manipuler les données des trois bases de données. Vous pouvez accéder à l'interface GraphQL Playground à l'adresse `http://localhost:4000/graphql` pour exécuter des requêtes interactivement.

### Types disponibles

1. **EmployeDB** :
   - `Adresse` - Informations sur les adresses
   - `Employe` - Informations sur les employés

2. **AssuranceDB** :
   - `InsuranceCompany` - Informations sur les compagnies d'assurance
   - `InsurancePolicy` - Détails des polices d'assurance
   - `Beneficiary` - Informations sur les bénéficiaires

3. **RHDB** :
   - `HRAdvisor` - Informations sur les conseillers RH

## Exemples de requêtes

Des exemples de requêtes sont disponibles dans le fichier `queries-examples.txt`.

### Exemples de base

1. Récupérer tous les employés :
   ```graphql
   query {
     employes {
       employee_number
       name
     }
   }
   ```

2. Créer un nouvel employé :
   ```graphql
   mutation {
     createEmploye(employe: {
       employee_number: "EMP003",
       name: "Alice Martin",
       insurance_policy_number: "POL456"
     }) {
       employee_number
       name
     }
   }
   ```

3. Récupérer une police d'assurance avec ses bénéficiaires :
   ```graphql
   query {
     insurancePolicy(policy_number: "POL123") {
       policy_number
       beneficiaries {
         id
         name
       }
     }
   }
   ```

Pour plus d'exemples, consultez le fichier `queries-examples.txt`.
