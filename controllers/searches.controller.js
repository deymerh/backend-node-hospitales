const { request, response } = require('express');
const User = require('../models/users.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctors.model');

const searches = async (req = request, res = response) => {
  
  const search = req.params.busqueda;
  const regex = new RegExp(search, 'i');

  const [users, hospitals, doctors] = await Promise.all([
    User.find({name: regex}),
    Hospital.find({name: regex}),
    Doctor.find({name: regex})
  ])

  res.json({
    ok: true,
    users,
    hospitals,
    doctors
  });
};

const getDocsCollection = async (req = request, res = response) => {
  
  const table = req.params.tabla;
  const search = req.params.busqueda;
  const regex = new RegExp(search, 'i');

  let data = [];

  switch (table) {
    case 'doctors':
      data = await Doctor.find({name: regex})
                          .populate('user', 'name img');
      break;
    case 'hospitals':
      data = await Hospital.find({name: regex})
                          .populate('user', 'name img');
      break;
    case 'users':
      data = await User.find({name: regex});
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: 'La tabla tiene que ser users/doctors/hospitals'
      });
  }

  res.json({
    ok: true,
    results: data
  });
};

module.exports = { searches, getDocsCollection };