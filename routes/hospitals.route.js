// route: '/api/hospitales'

const { Router } = require('express');
const { check } = require('express-validator');
const {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
} = require('../controllers/hospitals.controller');
const { validateFields } = require('../middleware/validate-fields');
const { validateToken } = require('../middleware/validate-jwt');

const router = Router();

router.get('/', validateToken, (getHospitals));
router.post('/',
  [
    validateToken,
    check('name', 'El nombre del hospital es necesario').not().isEmpty(),
    validateFields
  ],
  (createHospital)
);
router.put('/:id',
  [
    validateToken,
    check('name', 'El nombre del hospital es necesario').not().isEmpty(),
    validateFields
  ],
  (updateHospital)
);
router.delete('/:id', (validateToken), (deleteHospital));

module.exports = router;