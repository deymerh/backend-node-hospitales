const { response } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users.model');
const { generateJWT } = require('../helpers/jwt');
const { validateToken } = require('../middleware/validate-jwt');

const getUsers = async (req, res) => {
  const users = await User.find({}, '');
  res.json({
    ok: true,
    users,
    uid: req.uid
  });
}

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existEmail = await User.findOne({email});
    if(existEmail){
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya existe'
      });
    }
    const user = new User(req.body);

    //Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //Save user
    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id);
    
    res.json({
      ok: true,
      user,
      token
    })  
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado.'
    })
  }
  
}

const updateUser = async (req, res = response) => {
  // Validate token and check if it's correct user
  const uid = req.params.id;
  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese id'
      })
    }
   
    // Updates
    const { password, google, email, ...fields } = req.body;
    if(userDB.email !== email){
      const existEmail = await User.findOne({ email });
      if(existEmail){
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un usuario con ese email'
        })
      }
    }

    fields.email = email;
    const userUpdated = await User.findByIdAndUpdate(uid, fields, {new: true});

    res.json({
      ok: true,
      userUpdated
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado.'
    })
  }
}

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese id'
      })
    }
    const userDeleted = await User.findByIdAndDelete(uid, {new: true});
    res.json({
      ok: true,
      msg: 'Usuario borrado correctamente',
      userDeleted
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado.'
    })
  }
}

module.exports = {getUsers, createUser, updateUser, deleteUser};