const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect((process.env.DB_CNN), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB is connected');
  } catch (err) {
    console.log(err);
    throw new Error('Error connecting to DB ', err);
  }
}
module.exports = {dbConnection};