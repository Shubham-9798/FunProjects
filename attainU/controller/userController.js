
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const jsonpatch = require('jsonpatch')
const userAddress = require('./../model/userAddress')

require('dotenv').config()

exports.user_login_post = [
  // Validate input fields. Trim spaces around username
  body('username', 'Username required.').isLength({ min: 3 }).trim(),
  body('password', 'Password must atleast 6 characters.').isLength({ min:6 }),
  // Sanitize body with the wildcard.


  // Process the request after validating.
  (req, res) => {
    // Save errors from validation, if any.
    const errors = validationResult(req)
    // const errors = "error"

    // Check if there were errors from the form.
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() })
    }
    else {
      // Save username and password.
      // Convert username to lowercase for db consistency
      const username = req.body.username.toLowerCase()
      const password = req.body.password

      // mydoc = {
      //   "baz": "qux",
      //   "foo": "bar"
      // };
      // thepatch = [
      //   { "op": "replace", "path": "/baz", "value": "boo" }
      // ]
      // patcheddoc = jsonpatch.apply_patch(mydoc, thepatch);
      // console.log(patcheddoc)

      // Create a token for the user.
      const token = jwt.sign({ username: username }, process.env.jwtSecret,
        {expiresIn: 21600 })
      // Set token in header
      req.headers['token'] = token
      res.status(200).send({ user: username, authorized: true, token: token })
    }
  },
]

exports.user_address = [
  // Process the request after validating.
  (req, res) => {
    console.log(req.body)


      const {
        phoneNumber, address1, address2, pin, username
      } = req.body

      var new_user = new userAddress({ 
        phoneNumber: phoneNumber, 
        address1:address1,
        address2: address2,
        pin: pin,
        createdDate: Date.now()
    }) 
      
    new_user.save(function(err,result){ 
        if (err){ 
            console.log(err); 
            res.status(500).send('Server side Error')
        } 
        else{ 
            console.log(result) 
            res.status(200).send({ status: 'success', data: result})
        } 
    }) 





    
  },
]