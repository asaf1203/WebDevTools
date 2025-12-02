const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Static folder is client folder
app.use(express.static(path.join(__dirname, 'client')));

let songs = [
    { id: 1, title: "Shape of You", artist: "Ed Sheeran" },
    { id: 2, title: "Blinding Lights", artist: "The Weeknd" },
    { id: 3, title: "Counting Stars", artist: "OneRepublic" }
];

app.get('/songs', (req, res) => {
    res.json(songs);
});

// Get song by id
app.get('/songs/:id', (req, res) => {
    const song = songs.find(song => song.id === parseInt(req.params.id));
    if (!song) {
        return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/home.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/home.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/home.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});