import React, { useState, useEffect } from "react";

function SongList({ onSelectSong }) {
  // Definimos el estado de la lista de canciones
  const [songs, setSongs] = useState([]);

  // Cargamos la lista de canciones desde la API al cargar el componente
  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/sound/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data));
  }, []);

  // Renderizamos la lista de canciones
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
