const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

//configure cors
app.use(cors());

// Connect to database
dbConnection();

app.get('/', (req, res)=>{
  res.json({
    ok: true,
    msg: 'Hola mundo'
  })
})

app.listen(port, ()=>{
  console.log('Server running!');
});