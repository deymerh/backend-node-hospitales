// Route: /api/upload
const { Router } = require('express');
const expressUploadFile = require('express-fileupload');
const { uploadFile, returnPhoto } = require('../controllers/upload.controller');
const { validateToken } = require('../middleware/validate-jwt');

const router = Router();

router.use(expressUploadFile());

router.put('/:type/:id', (validateToken), (uploadFile));

router.get('/:type/:photo', (returnPhoto));

module.exports = router;