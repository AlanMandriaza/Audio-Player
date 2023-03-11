import React, { useState, useEffect } from "react";

function SongList({ onSelectSong }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/sound/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data));
  }, []);

  return (
    <ul>
      {songs.map((song) => (
        <li key={song.name} onClick={() => onSelectSong(song)}>
          {song.name}
        </li>
      ))}
    </ul>
  );
}

export default SongList;
