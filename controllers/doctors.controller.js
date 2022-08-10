const { response, request } = require('express');
const Doctor = require('../models/doctors.model');

const getDoctors = async (req = request, res = response) => {
  const doctors = await Doctor.find()
                              .populate('user', 'name img');
  res.json({
    ok: true,
    doctors
  });
};

const createDoctor = async (req = request, res = response) => {
  const medico = new Doctor({user: req.uid, ...req.body});
  try {
    const medicoDB = await medico.save();
    res.json({
      ok: true,
      medico: medicoDB
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador!'
    });
  }
};

const updateDoctor = (req = request, res = response) => {
  console.log(req.body);
  res.json({
    ok: true,
    msg: 'updateDoctor'
  });
};

const deleteDoctor = (req = request, res = response) => {
  console.log(req.body);
  res.json({
    ok: true,
    msg: 'deleteDoctor'
  });
};

module.exports = { getDoctors, createDoctor, updateDoctor, deleteDoctor };