const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { requireAuth, login } = require('./controllers/authController');
const taskController = require('./controllers/taskController');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname + '/../assets')));
app.get('/', express.static('views'));

app.post('/signin', login);

// AUTH REQUIRED ROUTES
app.use(requireAuth);
app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + '/../views/secret.html'));
});
app.get('/task', taskController.getTasks);
app.post('/task', taskController.postTask);
app.delete('/task/:taskId', taskController.deleteTask);

app.use('*', (req, res) => {
  res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
