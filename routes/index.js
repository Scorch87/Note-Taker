const express = require('express');

const notesRouter = require('./notes');

const app = express();

app.use('/api', notesRouter);

module.exports = app;