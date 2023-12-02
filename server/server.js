const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });
const app = require('./app');

const start = async () => {
  if (!process.env.MONGO_URI) throw Error('❌ MONGO_URI must be defined');

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('🍃 Connected to database');
  } catch (err) {
    console.log(err);
  }

  app.listen(3333, async () => {
    console.log('💥 Listening on port 3333');
  });
};

start();
