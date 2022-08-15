const { response, request } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users.model');
const { generateJWT } = require('../helpers/jwt');
const { verifyTokenGoogle } = require('../helpers/google-ferify');

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

const loginWithGoogle = async (req=request, res=response)=>{
  console.log(req.body.token);
  try {
    const { email, name, picture } = await verifyTokenGoogle(req.body.token);
    
    const userDB = await User.findOne({email});
    
    let user;
    if(!userDB){
      user = new User({
        name,
        email,
        image: picture,
        google: true,
        password: '@@@'
      });
    }else{
      user = userDB;
      user.google = true;
    }

    // save user
    await user.save();

    // generate token
    const token = await generateJWT(user.id);
    
    res.json({
      ok: true,
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'Token de Google no es correcto'
    })
  }
}

module.exports = { login, loginWithGoogle };