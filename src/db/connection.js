require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configuration commune pour toutes les bases de données
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// Initialiser les instances Sequelize pour chaque base de données
const employeDB = new Sequelize(
  process.env.EMPLOYE_DB,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
  }
);

const assuranceDB = new Sequelize(
  process.env.ASSURANCE_DB,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
  }
);

const rhDB = new Sequelize(
  process.env.RH_DB,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
  }
);

// Fonction pour tester les connexions aux bases de données
async function testConnections() {
  try {
    console.log('Testing database connections...');
    
    console.log('Testing connection to EmployeDB...');
    await employeDB.authenticate();
    console.log('Connection to EmployeDB has been established successfully.');
    
    console.log('Testing connection to AssuranceDB...');
    await assuranceDB.authenticate();
    console.log('Connection to AssuranceDB has been established successfully.');
    
    console.log('Testing connection to RHDB...');
    await rhDB.authenticate();
    console.log('Connection to RHDB has been established successfully.');
    
    console.log('All database connections are working properly.');
  } catch (error) {
    console.error('Unable to connect to one or more databases:', error);
    throw error; // Re-throw the error to be caught in the main application
  }
}

// Exporter les instances Sequelize et la fonction de test
module.exports = {
  employeDB,
  assuranceDB,
  rhDB,
  testConnections
};