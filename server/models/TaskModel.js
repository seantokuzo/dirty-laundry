const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'woohoo';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

const taskSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: new Date(Date.now()),
  },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
