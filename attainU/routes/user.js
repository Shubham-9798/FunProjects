const express = require('express')
const userController = require('../controller/userController')

const router = express.Router()
const jwt = require('jsonwebtoken')
const imageFunc = require('./../middleware/imageDownload');


let verifyToken =  (req, res, next) => {
    const authHeader = req.headers.authorization
	const token = authHeader && authHeader.split(' ')[1]
	// console.log(process.env.ACCESS_TOKEN_SECRET, token, "-----------------")
	if(token == null) return  res.send("Empty Token")
    
    jwt.verify(token, process.env.jwtSecret, (err, user) => {
    
    console.log(err)
    if (err)  res.status(403).send({ status: 'Token Error'})
    req.user = user
    next() // pass the execution off to whatever request the client intended
  })

}

// Login user and sign JWT
router.post('/login', userController.user_login_post)
router.post('/addAddress', verifyToken,  userController.user_address)
router.post('/image', verifyToken, imageFunc, (req,res) => {
});


module.exports = router