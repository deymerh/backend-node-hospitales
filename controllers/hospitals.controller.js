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

const updateHospital = async (req = request, res = response) => {
  
  const hospitalId = req.params.id;
  const uid = req.uid;

  try {
    const hospital = await Hospital.findById(hospitalId);
    if(!hospital){
      return res.status(400).json({
        ok: false,
        msg: 'No existe un hospital con ese id',
      });  
    }

    const changesHospital = { ...req.body, user: uid,  };
    const hospitalUpdated = await Hospital.findByIdAndUpdate(hospitalId, changesHospital, { new: true });
    res.json({
      ok: true,
      hospital: hospitalUpdated
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }

};

const deleteHospital = async (req = request, res = response) => {
  
  const hospitalId = req.params.id;

  try {
    const hospital = await Hospital.findById(hospitalId);

    if(!hospital){
      return res.status(400).json({
        ok: false,
        msg: 'No existe un hospital con ese id',
      });  
    }

    await Hospital.findByIdAndDelete(hospitalId);
    
    res.json({
      ok: true,
      msg: 'Hospital eliminado correctamente'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }

};


module.exports = { getHospitals, createHospital, updateHospital, deleteHospital };