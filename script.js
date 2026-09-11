const memes = [
    "memes/meme01.jpg",
    "memes/meme02.jpg",
    "memes/meme03.jpg",
    "memes/meme04.jpg",
    "memes/meme05.jpg"
];


const songs = [
    {
        url: "https://open.spotify.com/track/XXXXXXXXXXXX",
        title: "Canción 1"
    },
    {
        url: "https://open.spotify.com/track/YYYYYYYYYYYY",
        title: "Canción 2"
    },
    {
        url: "https://open.spotify.com/track/ZZZZZZZZZZZZ",
        title: "Canción 3"
    }
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
        "🎵 " + songs[songIndex].title;


    spotifyPlayer.innerHTML = `
        <iframe
            src="https://open.spotify.com/embed/track/${getSpotifyTrackId(songs[songIndex].url)}"
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
