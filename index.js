const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const app = express();
const cors = require('cors');

//configure cors
app.use(cors());

//Folder public sever
app.use( express.static('public') )

//configure body parser
app.use(express.json());

// Connect to database
dbConnection();

//Routes
app.use('/api/users', require('./routes/users.route'));
app.use('/api/hospitals', require('./routes/hospitals.route'));
app.use('/api/doctors', require('./routes/doctors.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/search', require('./routes/searches.route'));
app.use('/api/upload', require('./routes/upload.route'));

app.listen(process.env.PORT, ()=>{
  console.log('Server running!');
});