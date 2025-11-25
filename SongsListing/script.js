
document.addEventListener('DOMContentLoaded', () => {
    renderSongs();
});

const form = document.getElementById('songForm');
const list = document.getElementById('songList');
const submitBtn = document.getElementById('submitBtn');

// If not exists in local storage get emty array
// Else get jason text and convert it to object jason
let songs = JSON.parse(localStorage.getItem('playlist')) || [];

// User clicks the "+Add" button
form.addEventListener('submit', (e) => {
    // Dont submit the form to server yet. Let me handle it
    e.preventDefault();

    // Read Form's data
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;

    //TODO VALIDATE FIELDS

    // CreTE JSON object based on URL and title
    const song = {
        id: Date.now(),  // Unique ID
        title: title,
        url: url,
        dateAdded: Date.now()
    };

    songs.push(song);

    saveAndRender();

    form.reset();
});

// Save to locaStorage and render UI Table
function saveAndRender() {
    localStorage.setItem('playlist', JSON.stringify(songs));

    renderSongs();
}


function renderSongs() {
    list.innerHTML = ''; // Clear current list

    songs.forEach(song => {
        // Create table row
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${song.title}</td>
            <td><a href="${song.url}" target="_blank" class="text-info">Watch</a></td>
            <td class="text-end">
                <button class="btn btn-sm btn-warning me-2" onclick="editSong(${song.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteSong(${song.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        list.appendChild(row);
    });
}

function deleteSong(id) {
    if (confirm('Are you sure?')) {
        // Filter out the song with the matching ID
        songs = songs.filter(song => song.id !== id);
        saveAndRender();
    }
}

