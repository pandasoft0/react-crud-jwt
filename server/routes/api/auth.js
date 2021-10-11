const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const tokenList = {}

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  // check('email', 'Please include a valid email').isEmail(),
  // check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const isMatch = await bcrypt.compare(password, config.get('password'));

      if (!isMatch || email !== config.get('email')) {
        console.log('invalid');
        return res
          .status(200)
          .json({ error: 'Invalid Credentials' });
      }

      const payload = {
        user: config.get('payload')
      };

      const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 1000})
      const refreshToken = jwt.sign(payload, config.get('refreshTokenSecret'), { expiresIn: 86400})
      const response = {
          "status": "Logged in",
          "token": token,
          "refreshToken": refreshToken,
      }
      tokenList[refreshToken] = response;
      res.status(200).json(response);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/auth/token
// @desc     Get refresh toke6n
// @access   Public
router.post('/token', (req,res) => {
  // refresh the damn token
  const postData = req.body
  // if refresh token exists
  if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
      const payload = {
        user: config.get('payload')
      };
      const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 1000});
      // update the token in the list
      tokenList[postData.refreshToken].token = token
      res.send(token);        
  } else {
      res.status(404).send('Invalid request')
  }
})

router.post('/check', auth, (req, res) => {
  res.send(true);
});

router.post("/logout", (req, res) => {
  // refresh the damn token
  const postData = req.body
  // if refresh token exists
  if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
      delete tokenList[postData.refreshToken];
      res.send(true);        
  } else {
      res.status(404).send('Invalid request')
  }
});

module.exports = router;
