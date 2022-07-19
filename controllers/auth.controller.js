const { response } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users.model');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //Check email
    const userDB = await User.findOne({email});
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no válido'
      });
    }
    
    //Check and compare password
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña no válida'
      });
    }

    // Generate JWT
    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      token
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}

module.exports = { login };