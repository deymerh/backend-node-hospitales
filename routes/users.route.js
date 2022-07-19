// Route: /api/users

const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/users.controller");
const { validateFields } = require("../middleware/validate-fields");
const { validateToken } = require("../middleware/validate-jwt");

const router = Router();

router.get('/', validateToken, (getUsers));
router.post('/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatoria').isEmail(),
    validateFields
  ],
  (createUser)
);
router.put('/:id',
  [
    validateToken,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatoria').isEmail(),
    check('role', 'El role es obligatoria').isEmail(),
    validateFields
  ],
  (updateUser)
);
router.delete('/:id', (validateToken), (deleteUser));

module.exports = router;