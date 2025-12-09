//Initialization
const songsTableBody = document.querySelector("#songsTable tbody");
const songForm = document.getElementById("songForm");
const songIdInput = document.getElementById("songId");
const titleInput = document.getElementById("title");
const artistInput = document.getElementById("artist");
const yearInput = document.getElementById("year");
const fileInput = document.getElementById("file");

const cancelEditBtn = document.getElementById("cancelEditBtn");
const searchBtn = document.getElementById("searchBtn");
const searchArtistInput = document.getElementById("searchArtist");
const searchMinYearInput = document.getElementById("searchMinYear");
const searchMaxYearInput = document.getElementById("searchMaxYear");

let isEditing = false;

async function loadSongs() {
    const res = await fetch("/api/songs");
    const songs = await res.json();
    renderSongs(songs);
}

function renderSongs(songs) {
    songsTableBody.innerHTML = "";

    songs.forEach(song => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${song.id}</td>
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.year}</td>
            <td>
                ${song.mp3 ? `<audio controls src="${song.mp3}"></audio>` : `<span class="text-muted">No file</span>`}
            </td>
            <td>
                <button class="btn btn-sm btn-warning me-2" data-action="edit" data-id="${song.id}">Edit</button>
                <button class="btn btn-sm btn-danger" data-action="delete" data-id="${song.id}">Delete</button>
            </td>
        `;

        songsTableBody.appendChild(tr);
    });
}

loadSongs();

songForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const songData = {
        title: titleInput.value,
        artist: artistInput.value,
        year: yearInput.value
    };

    if (!isEditing) {
        // CREATE
        const res = await fetch("/api/songs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(songData)
        });
        if (!res.ok) {
            alert("Error creating song");
        }
    } else {
        // UPDATE
        const id = songIdInput.value;
        const res = await fetch(`/api/songs/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(songData)
        });
        if (!res.ok) {
            alert("Error updating song");
        }
    }

    clearForm();
    loadSongs();
});

function clearForm() {
    isEditing = false;
    songIdInput.value = "";
    titleInput.value = "";
    artistInput.value = "";
    yearInput.value = "";
    fileInput.value = ""; // will matter later
}


songsTableBody.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = btn.getAttribute("data-id");
    const action = btn.getAttribute("data-action");

    if (action === "edit") {
        const res = await fetch(`/api/songs/${id}`);
        if (!res.ok) {
            alert("Song not found");
            return;
        }
        const song = await res.json();
        isEditing = true;
        songIdInput.value = song.id;
        titleInput.value = song.title;
        artistInput.value = song.artist;
        yearInput.value = song.year;
        fileInput.value = ""; // we don't re-upload here
    }

    if (action === "delete") {
        if (!confirm("Delete this song?")) return;
        const res = await fetch(`/api/songs/${id}`, { method: "DELETE" });
        if (!res.ok) {
            alert("Error deleting song");
            return;
        }
        loadSongs();
    }
});

cancelEditBtn.addEventListener("click", () => {
    clearForm();
});