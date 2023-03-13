import React, { useState, useRef, useEffect } from "react";
import "../styles/index.css";
import { FaPause, FaPlay, FaArrowRight, FaArrowLeft } from "react-icons/fa";

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0); // Estado para el tiempo actual de reproducción
  const [duration, setDuration] = useState(0); // Estado para la duración total de la canción
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/sound/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data));
  }, []);

  function handlePlayPause() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleNextSong() {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    setIsPlaying(false);
  }

  function handlePrevSong() {
    setCurrentSongIndex(
      currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1
    );
    setIsPlaying(false);
  }

  function handleSelectSong(song) {
    const songURL = "https://assets.breatheco.de/apis/sound/" + song.url;
    const index = songs.findIndex((s) => s.name === song.name);
    setCurrentSongIndex(index);
    audioRef.current.src = songURL;
    audioRef.current.play().catch((error) => console.error(error));
    setIsPlaying(true);
  }

  function handleTimeUpdate() {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  }

  function handleProgressBarClick(event) {
    const newTime =
      (event.offsetX / progressBarRef.current.offsetWidth) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={`https://assets.breatheco.de/apis/sound/${songs[currentSongIndex]?.url}`}
        onEnded={handleNextSong}
        onTimeUpdate={handleTimeUpdate}
      />

      <ol>
        {/* Lista de canciones */}
        {songs.map((song, index) => (
          <li
            key={`${song.id}-${song.name}`}
            onClick={() => handleSelectSong(song)}
            className={index === currentSongIndex ? "selected" : ""}
          >
            {song.name}
          </li>
        ))}

        {/* Botones para controlar la reproducción */}
        <div className="botones d-flex">
          <button onClick={handlePrevSong}>
            <FaArrowLeft />
          </button>
          <button onClick={handlePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handleNextSong}>
            <FaArrowRight />
          </button>
          {/* Barra de progreso */}
          <div className="progress-bar-container">
            <progress
              ref={progressBarRef}
              value={currentTime}
              max={duration}
              onClick={handleProgressBarClick}
            />
            <div className="current-time">
              {isNaN(currentTime) ? "0:00" : formatTime(currentTime)}{" "}
              {isNaN(duration) ? "0:00" : formatTime(duration)}
            </div>
          </div>
        </div>
      </ol>
    </div>
  );
}
export default AudioPlayer;
