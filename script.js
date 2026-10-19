const memes = [
    "memes/meme01.jpg",
    "memes/meme02.jpg",
    "memes/meme03.jpg",
    "memes/meme04.gif",
    "memes/meme05.jpg",
    "memes/meme06.jpg",
    "memes/meme07.jpg",
    "memes/meme08.jpg",
    "memes/meme09.jpg",
    "memes/meme10.jpg",
    "memes/meme11.jpg",
    "memes/meme12.jpg",
    "memes/meme13.jpg",
    "memes/meme14.jpg",
    "memes/meme15.jpg",
    "memes/meme16.jpg",
    "memes/meme17.jpg",
    "memes/meme18.jpg",
    "memes/meme19.jpg",
    "memes/meme20.jpg",
    "memes/meme21.jpg",
    "memes/meme22.jpg",
    "memes/meme23.jpg",
    "memes/meme24.jpg",
    "memes/meme25.jpg",
    "memes/meme26.jpg",
    "memes/meme27.jpg",
    "memes/meme28.jpg",
    "memes/meme29.jpg",
    "memes/meme30.jpg",
    "memes/meme31.jpg",
    "memes/meme32.jpg",
    "memes/meme33.jpg",
    "memes/meme34.jpg",
    "memes/meme35.jpg",
    "memes/meme36.jpg",
    "memes/meme37.jpg",
    "memes/meme38.jpg",
    "memes/meme39.jpg",
    "memes/meme40.jpg",
    "memes/meme41.jpg",
    "memes/meme42.jpg",
    "memes/meme43.jpg",
    "memes/meme44.jpg",
    "memes/meme45.jpg",
    "memes/meme46.jpg",
    "memes/meme47.jpg",
    "memes/meme48.jpg",
    "memes/meme49.jpg",
    "memes/meme50.jpg",
    "memes/meme51.jpg",
    "memes/meme52.jpg",
    "memes/meme53.jpg",
    "memes/meme54.jpg",
    "memes/meme55.jpg",
    "memes/meme56.jpg",
    "memes/meme57.jpg"
];

const memeElement = document.getElementById("meme");
const spotifyPlayer = document.getElementById("spotify-player");
const randomButton = document.getElementById("random-button");
const songTitle = document.getElementById("song-title");

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
    if (typeof url !== "string") {
        return null;
    }

    const match = url.match(
        /(?:open\.spotify\.com\/|spotify:)(?:intl-[a-z]{2}\/)?track[/:]([a-zA-Z0-9]+)/
    );

    return match ? match[1] : null;
}

function generateSurprise() {
    if (memes.length === 0 || songs.length === 0) {
        return;
    }

    const memeIndex = randomDifferent(memes, previousMeme);
    const songIndex = randomDifferent(songs, previousSong);

    const song = songs[songIndex];
    const spotifyId = getSpotifyId(song.url);

    if (!spotifyId) {
        console.error("El enlace de Spotify no es válido:", song.url);
        spotifyPlayer.textContent =
            "No se pudo cargar esta canción. Prueba con otra combinación.";
        return;
    }

    previousMeme = memeIndex;
    previousSong = songIndex;

    // Mostrar meme
    memeElement.src = memes[memeIndex];
    memeElement.alt = "Meme sorpresa";

    // Mostrar encabezado de la canción
    songTitle.textContent = "🎵 Tu canción es:";

    // Mostrar reproductor de Spotify
    spotifyPlayer.innerHTML = `
        <iframe
            src="https://open.spotify.com/embed/track/${spotifyId}"
            title="Reproductor de Spotify"
            width="100%"
            height="152"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
        </iframe>
    `;
}

// Cargar canciones desde el archivo JSON
async function initializePage() {
    randomButton.disabled = true;
    songTitle.textContent = "🎵 Preparando tu canción...";
    spotifyPlayer.textContent = "Cargando Spotify...";

    try {
        const response = await fetch("taeminsongs.json");

        if (!response.ok) {
            throw new Error(
                `No se pudo cargar taeminsongs.json (${response.status})`
            );
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("La lista de canciones está vacía o no es válida.");
        }

        songs = data.filter(
            song =>
                song &&
                typeof song.url === "string" &&
                getSpotifyId(song.url)
        );

        if (songs.length === 0) {
            throw new Error("No se encontraron enlaces válidos de Spotify.");
        }

        randomButton.disabled = false;
        generateSurprise();

    } catch (error) {
        console.error("Error al cargar las canciones:", error);

        songTitle.textContent = "🎵 ¡Ups!";
        spotifyPlayer.textContent =
            "No se pudieron cargar las canciones. Intenta recargar la página.";
    }
}

// Cambiar meme y canción con el botón
randomButton.addEventListener("click", generateSurprise);

// Iniciar página
initializePage();
