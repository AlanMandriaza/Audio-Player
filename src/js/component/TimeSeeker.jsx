import React from 'react';

function TimeSeeker({ currentTime, audioRef }) {
  function formatTime(time) {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function handleSeekChange(e) {
    audioRef.current.currentTime = e.target.valueAsNumber;
  }

  return (
    <div>
      <span>{formatTime(currentTime)}</span>
      <input type="range" min={0} max={audioRef.current?.duration || 0} value={currentTime} onChange={handleSeekChange} />
      <span>{formatTime(audioRef.current?.duration || 0)}</span>
    </div>
  );
}

export default TimeSeeker;
