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
   git clone https://github.com/votre-nom/multi-db-graphql-api.git
   cd multi-db-graphql-api
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
   -- Création des bases
CREATE DATABASE IF NOT EXISTS EmployeDB;
CREATE DATABASE IF NOT EXISTS AssuranceDB;
CREATE DATABASE IF NOT EXISTS RHDB;

-- ============================
-- Base EmployeDB
-- ============================
USE EmployeDB;

CREATE TABLE IF NOT EXISTS Adresse (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rue VARCHAR(255),
    ville VARCHAR(100),
    code_postale VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Employe (
    numero_employe VARCHAR(50) PRIMARY KEY,
    nom VARCHAR(255),
    numero_police_assurance VARCHAR(50), -- Liaison logique vers AssuranceDB.PoliceAssurance
    adresse_id INT,
    FOREIGN KEY (adresse_id) REFERENCES Adresse(id)
);

-- ============================
-- Base AssuranceDB
-- ============================
USE AssuranceDB;

CREATE TABLE IF NOT EXISTS CompagnieAssurance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PoliceAssurance (
    numero_police VARCHAR(50) PRIMARY KEY
    -- On peut ajouter une compagnie_assurance_id si besoin
);

CREATE TABLE IF NOT EXISTS Beneficiaire (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS BeneficiairePrincipal (
    police_assurance_id VARCHAR(50),
    beneficiaire_id INT,
    PRIMARY KEY (police_assurance_id, beneficiaire_id),
    FOREIGN KEY (police_assurance_id) REFERENCES PoliceAssurance(numero_police),
    FOREIGN KEY (beneficiaire_id) REFERENCES Beneficiaire(id)
);

CREATE TABLE IF NOT EXISTS ListeBeneficiaire (
    police_assurance_id VARCHAR(50),
    beneficiaire_id INT,
    PRIMARY KEY (police_assurance_id, beneficiaire_id),
    FOREIGN KEY (police_assurance_id) REFERENCES PoliceAssurance(numero_police),
    FOREIGN KEY (beneficiaire_id) REFERENCES Beneficiaire(id)
);

-- ============================
-- Base RHDB
-- ============================
USE RHDB;

CREATE TABLE IF NOT EXISTS ConseillerRH (
    identifiant VARCHAR(50) PRIMARY KEY
);

-- ============================
-- Fin du script
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

Des exemples de requêtes sont disponibles dans le fichier `queries-examples.graphql`.

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
