const notes = require('express').Router();
const uuid = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');
// api routes:
// get /api/notes should read the db.json file and return all saved notes as JSON
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    console.log(readFromFile('./db/db.json'));
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    // add error log here to see what happens.
});
// post /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
notes.post('/', (req, res) => {
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

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    console.log(req.params);
    const noteId = req.params.id
    readFromFile('./db/db.json')
        .then((data)=> JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);

            writeToFile('./db/db.json', result);
            res.json(`Item ${noteId} has been deleted`);
        })   
});

// BONUS
// DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.


module.exports = notes;