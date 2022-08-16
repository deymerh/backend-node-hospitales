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

const updateDoctor = async (req = request, res = response) => {
  const doctorlId = req.params.id;
  const uid = req.uid;

  try {
    const doctor = await Doctor.findById(doctorlId);
    if(!doctor){
      return res.status(400).json({
        ok: false,
        msg: 'No existe un médico con ese id',
      });  
    }

    const changesDoctor = { ...req.body, user: uid };
    const doctorUpdated = await Doctor.findByIdAndUpdate(doctorlId, changesDoctor, { new: true });

    res.json({
      ok: true,
      medico: doctorUpdated
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};

const deleteDoctor = async (req = request, res = response) => {

  const doctorId = req.params.id;

  try {
    const doctor = await Doctor.findById(doctorId);

    if(!doctor){
      return res.status(400).json({
        ok: false,
        msg: 'No existe un médico con ese id',
      });  
    }

    await Doctor.findByIdAndDelete(doctorId);
    
    res.json({
      ok: true,
      msg: 'Médico eliminado correctamente'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }

};

module.exports = { getDoctors, createDoctor, updateDoctor, deleteDoctor };