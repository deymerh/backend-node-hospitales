// route: '/api/doctors'

const { Router } = require('express');
const { check } = require('express-validator');
const {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctors.controller');
const { validateFields } = require('../middleware/validate-fields');
const { validateToken } = require('../middleware/validate-jwt');

const router = Router();

router.get('/', validateToken, (getDoctors));
router.post('/',
  [
    validateToken,
    check('name', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital id debe ser válido').isMongoId(),
    validateFields
  ],
  (createDoctor)
);
router.put('/:id',
  [
    validateFields
  ],
  (updateDoctor)
);
router.delete('/:id', (deleteDoctor));

module.exports = router;