import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import soundtracks from '../config/playlist.json'

// Initial state
const initialState = {
  fileInfo: {},
  soundtracks: soundtracks,
  soundtrack: {},
  active: {},
  current: 0,
  subtune: 0,
  currentSongTime:0,
  currentSongProgress:0,
  currentSongTotalTime: 1,
  playing: false,
  pause: true,
  playlistOpen: false,
  songs: [],
  loaded: false,
}

let timer = null

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)


  const showPlayList = () => {
    dispatch({
      type: 'SHOW_PLAYLIST'
    })
}

 const togglePlaying = () => {
  clearInterval(timer)
    dispatch({
      type: 'TOGGLE_PLAYING'
    })
}

 const playNextSong = () => {
    dispatch({
      type: 'NEXT_SONG'
    })
}

 const playPrevSong = () => {
    dispatch({
      type: 'PREVIOUS_SONG'
    })
}

 const playListSongSelect = ( selectedSongID ) => {
    dispatch({
      type: 'PLAYLIST_SONG_SELECT',
      payload: selectedSongID
    })
}

const tick = () => {
  dispatch({
    type: 'TIMER_TICK'
  })
}

 const startTimer = () => {
  dispatch({ type: 'TIMER_START'})
  clearInterval(timer)
  timer = setInterval(() => tick(), 1000);
}

 const stopTimer = () => {
    clearInterval(timer)
    dispatch({ type: 'TIMER_STOP'})
}

 const pauseTimer = () => {
    clearInterval(timer)
    dispatch({type: 'TIMER_PAUSE'})
}

 const resumeTimer = () => {
  clearInterval(timer)
  timer = setInterval(() => tick(), 1000);
  dispatch({ type: 'TIMER_RESUME' });
}

const resetTimer = () => {
  clearInterval(timer)
  dispatch({ type: 'TIMER_RESET' });
}

 const getFileInfo = ( fileInfo ) => {
    dispatch({
      type: 'GET_FILE_INFO',
      payload: fileInfo
    })
}

 const getPlaylistItem = ( item ) => {
    dispatch({
        type: 'GET_PLAYLIST_ITEM',
        payload: item
    })
}

  return (<GlobalContext.Provider value={{
    fileInfo: state.fileInfo,
    soundtracks: state.soundtracks,
    soundtrack: state.soundtrack,
    active: state.active,
    current: state.current,
    subtune: state.subtune,
    currentSongTime:state.currentSongTime,
    currentSongProgress:state.currentSongProgress,
    currentSongTotalTime: state.currentSongTotalTime,
    playing: state.playing,
    pause: state.pause,
    playlistOpen: state.playlistOpen,
    songs: state.songs,
    loaded: state.loaded,
    showPlayList,
    togglePlaying,
    playNextSong,
    playPrevSong,
    playListSongSelect,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    getFileInfo,
    getPlaylistItem
  }}>
    {children}
  </GlobalContext.Provider>);
}