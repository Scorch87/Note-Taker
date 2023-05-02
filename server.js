const express = require('express');
const db = require('./db/db.json');
const PORT = 3001;
const app = express();
const path = require('path');
const fs = require('fs');
const api = require('./routes/index.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

//get /notes should return the notes.html file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// get * should return the index.html file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));


app.listen(PORT, ()=> console.log(`Server running- listening on port: ${PORT}`));