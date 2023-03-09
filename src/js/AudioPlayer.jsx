import React, { useState, useRef } from "react";
function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  function handlePlayPause() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }
  return (
    <div>
      <audio
        ref={audioRef}
        src="https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
        onEnded={() => setIsPlaying(false)}
      />
      <button onClick={handlePlayPause}>
        {isPlaying ? "Pausar" : "Reproducir"}
      </button>
    </div>
  );
}

export default AudioPlayer;
