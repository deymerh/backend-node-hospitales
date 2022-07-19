const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const app = express();
const cors = require('cors');

//configure cors
app.use(cors());

//configure body parser
app.use(express.json());

// Connect to database
dbConnection();

//Routes
app.use('/api/users', require('./routes/users.route'));
app.use('/api/login', require('./routes/auth.route'));

app.listen(process.env.PORT, ()=>{
  console.log('Server running!');
});