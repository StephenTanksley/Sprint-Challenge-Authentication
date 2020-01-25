const router = require('express').Router();
const express = require('express')

const authModel = require('./authModel')
const authorization = require('./authenticate-middleware')

const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')
const bcrypt = require('bcryptjs')


router.post('/register', async (req, res, next) => {
  try {
    const saved = await userModel.add(req.body)
    res.status(201).json(saved)
  }
  catch (error) {
    next(error)
  }
});

router.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await userModel.getBy({username}).first()
    const passwordValid = await bcrypt.compare(password, user.password)
  
    if(user && passwordValid) {
      const token = generateToken(user)
  
      res.status(200).json({
        message: `Welcome, ${user.username}`,
        token: token,
      })
    } else {
      res.status(401).json({
        message: 'Invalid credentials',
      })
    }

  }
  catch (error) {
    next(error)
  }
});

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secrets.jwt, options)
}

module.exports = router;