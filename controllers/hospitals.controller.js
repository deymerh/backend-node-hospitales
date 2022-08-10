const { response, request } = require('express');
const Hospital = require('../models/hospital.model');

const getHospitals = async (req = request, res = response) => {
  console.log(req.body);
  const hospitals = await Hospital.find().populate('user', 'name img');
  res.json({
    ok: true,
    hospitals
  });
};

const createHospital = async (req = request, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({user: uid, ...req.body});
  try {
    const hospitalDB = await hospital.save();
    res.json({
      msg: 'Hospital guardado correctamente',
      usuario: uid,
      hospital: hospitalDB
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};

const updateHospital = (req = request, res = response) => {
  console.log(req.body);
  res.json({
    ok: true,
    msg: 'updateHospital'
  });
};

const deleteHospital = (req = request, res = response) => {
  console.log(req.body);
  res.json({
    ok: true,
    msg: 'deleteHospital'
  });
};


module.exports = { getHospitals, createHospital, updateHospital, deleteHospital };