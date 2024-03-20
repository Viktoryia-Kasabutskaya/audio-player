const audio = document.querySelector("audio");
const currentTime = document.querySelector(".current-time");
const songTime = document.querySelector(".song-time");
const btnPlay = document.querySelector(".play-pause");
const btnNext = document.querySelector(".next-song");
const btnPrev = document.querySelector(".previous-song");
const artist = document.querySelector(".artist");
const song = document.querySelector(".song");
const playerImg = document.querySelector(".player-img");
const background = document.querySelector(".container");
const progressBar = document.querySelector(".detector");

let isPlay = false;
let songNum = 0;
const songs = [
  {
    song: "Don't Hurt Yourself",
    artist: "Beyonce",
    audioSrc: "assets/audio/beyonce.mp3",
    imgSrc: "assets/img/lemonade.png",
  },
  {
    song: "Don't Start Now",
    artist: "Dua Lipa",
    audioSrc: "assets/audio/dontstartnow.mp3",
    imgSrc: "assets/img/dontstartnow.png",
  },
  {
    song: "Skyfall",
    artist: "Adele",
    audioSrc: "assets/audio/adele-skyfall.mp3",
    imgSrc: "assets/img/Skyfall.png",
  },
];

btnPlay.addEventListener("click", audioPlay);

function audioPlay() {
  if (!isPlay) {
    isPlay = true;
    audio.play();
    btnPlay.src = "assets/icons/pause.png";
  } else {
    isPlay = false;
    audio.pause();
    btnPlay.src = "assets/icons/play.png";
  }
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

setInterval(() => {
  updateprogressBar();
  if (audio.currentTime === audio.duration) nextSong();
}, 500);

function updateprogressBar() {
  progressBar.min = 0;
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  currentTime.textContent = formatTime(audio.currentTime);
  songTime.textContent = formatTime(audio.duration);
}

progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
  updateprogressBar();
});

function loadSong() {
  audio.src = songs[songNum].audioSrc;
  playerImg.src = songs[songNum].imgSrc;
  song.textContent = songs[songNum].song;
  artist.textContent = songs[songNum].artist;
  background.style.backgroundImage = `url(${songs[songNum].imgSrc})`;
}

btnNext.addEventListener("click", nextSong);

function nextSong() {
  songNum += 1;
  if (songNum >= songs.length) songNum = 0;
  loadSong();
  if (isPlay) audio.play();
}

function prevSong() {
  songNum -= 1;
  if (songNum < 0) songNum = songs.length - 1;
  loadSong();
  if (isPlay) audio.play();
}

btnPrev.addEventListener("click", prevSong);
