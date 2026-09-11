const memes = [
    "memes/meme01.jpg",
    "memes/meme02.jpg",
    "memes/meme03.jpg",
    "memes/meme04.jpg",
    "memes/meme05.jpg"
];


const songs = [
    "https://open.spotify.com/intl-es/track/4jMwQaDiDICry8Ia1gFnAn?si=727bddaad2ab4256",
    "https://open.spotify.com/intl-es/track/1cgBWgoL6520lR2QZDzdGN?si=5cb163c31a1741fa",
    "https://open.spotify.com/intl-es/track/2KXEE2MsPZLmT38XiyAOpH?si=d362cfb472e44b94"
];


const memeElement = document.getElementById("meme");
const spotifyPlayer = document.getElementById("spotify-player");
const randomButton = document.getElementById("random-button");


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

    return url
        .split("/track/")[1]
        .split("?")[0];
}


function generateSurprise() {

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
        getSpotifyId(songs[songIndex]);


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


// Botón
randomButton.addEventListener(
    "click",
    generateSurprise
);


// Primera combinación
generateSurprise();
