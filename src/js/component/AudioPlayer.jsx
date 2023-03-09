import React, { useState, useRef } from 'react';
import TimeSeeker from './TimeSeeker.jsx';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  function handlePlayPause() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }
  function handleTimeUpdate() {
    setCurrentTime(audioRef.current.currentTime);
  }

  return (
    <div>
      <audio
        ref={audioRef}
        src="https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <button onClick={handlePlayPause}>{isPlaying ? 'Pausar' : 'Reproducir'}</button>
      <TimeSeeker currentTime={currentTime} audioRef={audioRef} />
    </div>
  );
}

export default AudioPlayer;
