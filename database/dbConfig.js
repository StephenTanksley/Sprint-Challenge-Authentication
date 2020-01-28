const knex = require('knex');
const knexConfig = require('../knexfile.js');

const dbEnv = process.env.NODE_ENV || 'dev'

module.exports = knex(knexConfig[dbEnv]);