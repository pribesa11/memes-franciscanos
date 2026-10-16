
const memes = [
    "memes/meme01.jpg",
    "memes/meme02.jpg",
    "memes/meme03.jpg",
    "memes/meme04.jpg",
    "memes/meme05.jpg"
];


const memeElement = document.getElementById("meme");
const spotifyPlayer = document.getElementById("spotify-player");
const randomButton = document.getElementById("random-button");


let songs = [];
let previousMeme = -1;
let previousSong = -1;


function randomDifferent(array, previous) {

    if (array.length <= 1) {
        return 0;
    }

    let index;

    do {
        index = Math.floor(Math.random() * array.length);
    } while (index === previous);

    return index;
}


function getSpotifyId(url) {

    const match = url.match(/\/track\/([a-zA-Z0-9]+)/);

    return match ? match[1] : null;
}


function generateSurprise() {

    if (memes.length === 0 || songs.length === 0) {
        return;
    }

    const memeIndex =
        randomDifferent(memes, previousMeme);

    const songIndex =
        randomDifferent(songs, previousSong);


    previousMeme = memeIndex;
    previousSong = songIndex;


    // Mostrar meme
    memeElement.src = memes[memeIndex];


    // Mostrar canción de Spotify
    const spotifyId =
        getSpotifyId(songs[songIndex].url);

    if (!spotifyId) {
        console.error("No se pudo obtener el ID de Spotify.");
        return;
    }

    spotifyPlayer.innerHTML = `
        <iframe
            src="https://open.spotify.com/embed/track/${spotifyId}"
            width="100%"
            height="152"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
        </iframe>
    `;
}


// Cargar canciones desde songs.json
async function initializePage() {

    randomButton.disabled = true;

    try {
        const response = await fetch("taeminsongs.json");

        if (!response.ok) {
            throw new Error("No se pudo cargar taeminsongs.json");
        }

        songs = await response.json();

        if (!Array.isArray(songs) || songs.length === 0) {
            throw new Error("La lista de canciones está vacía.");
        }

        randomButton.disabled = false;
        generateSurprise();

    } catch (error) {
        console.error("Error al cargar las canciones:", error);

        spotifyPlayer.textContent =
            "No se pudieron cargar las canciones. Recarga la página e inténtalo de nuevo.";
    }
}


// Cambiar meme y canción con el botón
randomButton.addEventListener("click", generateSurprise);


// Iniciar página
initializePage();
