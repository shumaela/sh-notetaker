const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import uuid for generating unique IDs

// Route to read notes from db.json
router.get('/api/notes', (req, res) => {
    const notes = readNotes();
    res.json(notes);
});

// Route to save a new note to db.json
router.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = generateUniqueId();

    const notes = readNotes();
    notes.push(newNote);

    writeNotes(notes);

    res.json(newNote);

});

// Function to read notes from db.json
function readNotes() {
    const filePath = path.join(__dirname, '../db/db.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) || [];
}

// Function to write notes to db.json
function writeNotes(notes) {
    const filePath = path.join(__dirname, '../db/db.json');
    fs.writeFileSync(filePath, JSON.stringify(notes));
}

// Function to generate a unique ID (you can use npm package like uuid)
function generateUniqueId() {
    return uuidv4();
}

// Route to delete a note by ID from db.json
router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    // Read existing notes from db.json
    const notes = readNotes();

    // Find the index of the note with the specified ID
    const noteIndex = notes.findIndex((note) => note.id === noteId);

    // If the note is found, remove it from the array
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);

        // Write the updated notes back to db.json
        writeNotes(notes);

        res.json({ success: true });
    } else {
        // If the note with the specified ID is not found, return a 404 status
        res.status(404).json({ success: false, message: 'Note not found' });
    }
});

// Export the router
module.exports = router;
