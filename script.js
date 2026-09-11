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


const memeElement =
    document.getElementById("meme");

const songTitleElement =
    document.getElementById("song-title");

const spotifyPlayer =
    document.getElementById("spotify-player");

const randomButton =
    document.getElementById("random-button");


let previousMeme = -1;
let previousSong = -1;


function getRandomDifferentIndex(array, previousIndex) {

    if (array.length === 1) {
        return 0;
    }

    let index;

    do {
        index =
            Math.floor(Math.random() * array.length);

    } while (index === previousIndex);

    return index;
}


function generateSurprise() {

    const memeIndex =
        getRandomDifferentIndex(
            memes,
            previousMeme
        );


    const songIndex =
        getRandomDifferentIndex(
            songs,
            previousSong
        );


    previousMeme = memeIndex;
    previousSong = songIndex;


    memeElement.src =
        memes[memeIndex];


    songTitleElement.textContent =
    "🎵 Spotify";


    spotifyPlayer.innerHTML = `
        <iframe
            src="https://open.spotify.com/embed/track/${getSpotifyTrackId(songs[songIndex]))}"
            width="100%"
            height="152"
            frameborder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
        </iframe>
    `;
}


function getSpotifyTrackId(url) {

    const parts =
        url.split("/track/");

    if (parts.length < 2) {
        return "";
    }

    return parts[1].split("?")[0];
}


randomButton.addEventListener(
    "click",
    generateSurprise
);


generateSurprise();
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


const memeElement =
    document.getElementById("meme");

const spotifyPlayer =
    document.getElementById("spotify-player");

const randomButton =
    document.getElementById("random-button");


let previousMeme = -1;
let previousSong = -1;


function getRandomDifferentIndex(array, previousIndex) {

    if (array.length === 1) {
        return 0;
    }

    let index;

    do {
        index =
            Math.floor(Math.random() * array.length);

    } while (index === previousIndex);

    return index;
}


function getSpotifyTrackId(url) {

    const parts =
        url.split("/track/");

    if (parts.length < 2) {
        return "";
    }

    return parts[1].split("?")[0];
}


function generateSurprise() {

    const memeIndex =
        getRandomDifferentIndex(
            memes,
            previousMeme
        );


    const songIndex =
        getRandomDifferentIndex(
            songs,
            previousSong
        );


    previousMeme = memeIndex;
    previousSong = songIndex;


    memeElement.src =
        memes[memeIndex];


    const trackId =
        getSpotifyTrackId(
            songs[songIndex]
        );


    spotifyPlayer.innerHTML = `
        <iframe
            src="https://open.spotify.com/embed/track/${trackId}"
            width="100%"
            height="152"
            frameborder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
        </iframe>
    `;
}


randomButton.addEventListener(
    "click",
    generateSurprise
);


generateSurprise();
