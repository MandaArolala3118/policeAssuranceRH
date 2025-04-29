const { DataTypes } = require('sequelize');
const { rhDB } = require('../../connection');

const HRAdvisor = rhDB.define('HRAdvisor', {
  identifier: {
    type: DataTypes.STRING(50),
    primaryKey: true
  }
}, {
  tableName: 'HRAdvisor',
  timestamps: false
});

module.exports = HRAdvisor;