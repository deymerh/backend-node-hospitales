const fs = require('fs');
const path = require('path');


const { request, response } = require('express');
const { v4: uuid4 } = require('uuid');
const { updateImage } = require('../helpers/updateImage');
const { fchmodSync } = require('fs');

const uploadFile = async (req = request, res = response)=>{

  const type = req.params.type;
  const id = req.params.id;
  const permissionTypes = ['hospitals', 'doctors', 'users'];

  console.log('type: ', type);
  console.log('id: ', id);

  if (!permissionTypes.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es un médico, usuario u hospital'
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No hay ningún archivo seleccionado' 
    });
  }

  const file = req.files.image;

  const nameImageSplit = file.name.split('.');
  const formatOfImage = nameImageSplit[nameImageSplit.length - 1];
  
  const extencionsValid = ['png', 'jpg', 'jpeg', 'gif'];

  if (!extencionsValid.includes(formatOfImage)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es una extensión permitida' 
    });
  }

  const nameFile = `${uuid4()}.${formatOfImage}`;

  const path = `./uploads/${type}/${nameFile}`;

  file.mv((path), (err)=>{
    if(err){
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'Error al movel la imagen'
      });
    }

  updateImage(type, id, path, nameFile);
    res.json({
      ok: true,
      nameFile,
      msg: 'Archivo file ok'
    });
  });
};

const returnPhoto = (req = request, res = response)=>{
  
  const type = req.params.type;
  const photo = req.params.photo;
  
  const pathPhoto = path.join(__dirname, `../uploads/${type}/${photo}`);

  if (fs.existsSync(pathPhoto)) {
    res.sendFile(pathPhoto);
  }else{
    const pathPhoto = path.join(__dirname, `../uploads/no-image.jpg`);
    res.sendFile(pathPhoto);
  }
}

module.exports = { uploadFile, returnPhoto };