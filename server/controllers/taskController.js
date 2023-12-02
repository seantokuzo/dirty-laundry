const Task = require('../models/TaskModel');

module.exports = {
  getTasks: async (req, res, next) => {
    console.log('💥 Get tasks');
    try {
      const tasks = await Task.find();
      return res.status(200).json(tasks);
    } catch (err) {
      return next({
        message: 'Error with database',
      });
    }
  },
  postTask: async (req, res, next) => {
    console.log('💥 Create task');
    const { task } = req.body;

    if (!task) {
      return next({
        message: 'Please provide a valid task',
      });
    }

    try {
      const newTask = await Task.create({
        item: task,
        created_at: new Date(Date.now()),
      });
      return res.status(201).json('Success');
    } catch (err) {
      return next({
        message: 'Error with database',
      });
    }
  },
  deleteTask: async (req, res, next) => {
    console.log('💥 Delete task');
    const { taskId } = req.params;
    console.log(taskId);

    if (!taskId) {
      return next({
        message: 'No task id provided',
      });
    }

    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      return res.status(200).json('Success');
    } catch (error) {
      return next({
        message: 'Error with database',
      });
    }
  },
};
