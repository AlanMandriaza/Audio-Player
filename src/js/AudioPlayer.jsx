import React, { useState, useRef, useEffect } from "react";

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

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

  return (
    <div>
      <audio
        ref={audioRef}
        src={`https://assets.breatheco.de/apis/sound/${songs[currentSongIndex]?.url}`}
        onEnded={handleNextSong}
      />
      <button onClick={handlePrevSong}>Previous</button>
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={handleNextSong}>Next</button>
      <ul>
        {songs.map((song) => (
          <li
            key={`${song.id}-${song.name}`}
            onClick={() => handleSelectSong(song)}
          >
            {song.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AudioPlayer;
