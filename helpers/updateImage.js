const fs = require('fs');

const User = require('../models/users.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctors.model');

const deleteImageOld = (path) => {
  if(fs.existsSync(path)){
    //delete image old
    fs.unlinkSync(path);
  }
}
const updateImage = async (type, id, nameFile)=>{

  let oldPath = '';
  switch (type) {
    case 'doctors':
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log('No existe un medico con ese id');
        return false;
      }
      oldPath = `./uploads/doctors/${doctor.img}`;
      deleteImageOld(oldPath);
      //save image
      doctor.img = nameFile;
      await doctor.save();
      return true;
    case 'hospitals':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log('No existe un hospital con ese id');
        return false;
      }
      oldPath = `./uploads/hospital/${hospital.img}`;
      deleteImageOld(oldPath);
      //save image
      hospital.img = nameFile;
      await hospital.save();
      return true;
    case 'users':
      const user = await User.findById(id);
      if (!user) {
        console.log('No existe un usuario con ese id');
        return false;
      }
      oldPath = `./uploads/users/${user.img}`;
      deleteImageOld(oldPath);
      //save image
      user.img = nameFile;
      await user.save();
      return true;
    default:
      return res.status(400).json({
        ok: false,
        msg: 'La tabla tiene que ser users/doctors/hospitals y enviar su respectivo id'
      });
  }
}

module.exports = { updateImage };