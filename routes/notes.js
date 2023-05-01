const notes = require('express').Router();
const {getNotes, saveNote, deleteNote} = require('../public/assets/js/index');
const uuid = require('uuid');
// api routes:
// get /api/notes should read the db.json file and return all saved notes as JSON
notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    getNotes('./db/db.json').then((data) => res.json(JSON.parse(data)));
})
// post /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
notes.post('/notes', (req, res) => {
    console.info(`${req.method} rquest received to add a note`);
    console.log(req.body);
    const {title, text} = req.body;
    const id = uuid.v4();

    if(req.body){
        const newNote = {
            id,
            title,
            text
        };

        saveNote(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

notes.delete('/notes/:id', (req, res) => {
    console.info(`${req.mthod} request received to delete a note`);
    console.log(req.params);
    
})

// BONUS
// DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

module.exports = notes;