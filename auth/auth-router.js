const router = require('express').Router();
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || 'You are the perfect drug.'
const bcrypt = require('bcryptjs')
// const authModel = require('')

router.post('/register', async (req, res, next) => {
  try {
    let { username, password } = req.body
    const newUser = username && password
    ? await 

  }
  catch (error) {
    next(error)
  }

});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
