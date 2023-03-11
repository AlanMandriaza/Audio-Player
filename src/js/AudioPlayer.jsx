import React from 'react';

import audioFiles from './audioFiles';

// Define el estado inicial
const initialState = {
  selectedSong: null,
  audio: null
};

// Define el reducer que actualiza el estado
function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_SONG':
      return { ...state, selectedSong: action.payload };
    case 'SET_AUDIO':
      return { ...state, audio: action.payload };
    default:
      return state;
  }
}

function AudioPlayer() {
  
  // Inicializa el estado usando el reducer
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // Define la función para manejar la selección de una canción
  function handleSelectSong(song) {
    // Crea una instancia del audio para la canción seleccionada
    const audio = new Audio(`/songs/${song.file}`);
    // Actualiza el estado con la canción seleccionada y su instancia de audio correspondiente
    dispatch({ type: 'SELECT_SONG', payload: song });
    dispatch({ type: 'SET_AUDIO', payload: audio });
  }

  // Define la función para manejar el play/pause del audio
  function handlePlayPause() {
    const audio = state.audio;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  // Renderiza la vista previa del reproductor de audio
  return (
    <div>
      <h2>{state.selectedSong ? state.selectedSong.name : 'Selecciona una canción'}</h2>
      <button onClick={handlePlayPause}>{state.audio && state.audio.paused ? 'Play' : 'Pause'}</button>
      <ul>
        {/* Recorre el arreglo de canciones para renderizar una lista de botones que permiten seleccionar una canción */}
        {audioFiles.map(song => (
          <li key={song.name} onClick={() => handleSelectSong(song)}>
            {song.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Exporta el componente por defecto del archivo
export default AudioPlayer;
