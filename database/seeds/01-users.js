const bcrypt = require('bcryptjs')
const hash = async (password) => bcrypt.hash(password, 14)

exports.seed = async (knex) => {
  await knex('users').insert([
    {
      username: 'StephenTanksley',
      password: `${await hash('superpassword5')}`
    },
    {
      username: 'Kima',
      password: `${await hash('donut')}`
    },
    {
      username: 'AJ',
      password: `${await hash('woo')}`
    }
  ])
};
