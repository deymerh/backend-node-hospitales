// Route: /api/login
const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginWithGoogle } = require('../controllers/auth.controller');
const { validateFields } = require('../middleware/validate-fields');

const router = Router();

router.post('/',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
  ],  
  (login)
);

router.post('/google',
  [
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validateFields
  ],  
  (loginWithGoogle)
);

module.exports = router;