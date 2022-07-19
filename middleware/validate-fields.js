const { response } = require('express');
const { validationResult } = require('express-validator');

const validateFields = (req, res = response, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(":::validateFields::::");
    return res.status(400).json({
      ok: false,
      errors: errors.array()
    });
  }
  next();
}

module.exports = { validateFields };