const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// Route to read notes from db.json
router.get('/api/notes', (req, res) => {
    const notes = readNotes();
    res.json(notes);
});

// Route to save a new note to db.json
router.post('/notes', (req, res) => {
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
    // Implement your logic here
}

// Export the router
module.exports = router;
