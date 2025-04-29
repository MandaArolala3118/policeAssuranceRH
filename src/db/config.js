require('dotenv').config();

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

// Configurations spécifiques pour chaque base de données
module.exports = {
  employeDB: {
    ...dbConfig,
    database: process.env.EMPLOYE_DB
  },
  assuranceDB: {
    ...dbConfig,
    database: process.env.ASSURANCE_DB
  },
  rhDB: {
    ...dbConfig,
    database: process.env.RH_DB
  }
};