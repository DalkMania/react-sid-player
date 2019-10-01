export const SHOW_PLAYLIST = 'player/SHOW_PLAYLIST'
export const TOGGLE_PLAYING = 'player/TOGGLE_PLAYING'
export const NEXT_SONG = 'player/NEXT_SONG'
export const PREVIOUS_SONG = 'player/PREVIOUS_SONG'
export const PLAYLIST_SONG_SELECT = 'player/PLAYLIST_SONG_SELECT'
export const TIMER_START = 'player/TIMER_START'
export const TIMER_TICK = 'player/TIMER_TICK'
export const TIMER_PAUSE = 'player/TIMER_PAUSE'
export const TIMER_RESUME = 'player/TIMER_RESUME'
export const TIMER_STOP = 'player/TIMER_STOP'
export const GET_PLAYLIST_ITEM = 'player/GET_PLAYLIST_ITEM'
export const GET_FILE_INFO = 'player/GET_FILE_INFO'

let timer = null

export const showPlayList = () => {
  return dispatch => {
    dispatch({
      type: SHOW_PLAYLIST
    })
  }
}

export const togglePlaying = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_PLAYING
    })
  }
}

export const playNextSong = () => {
  return dispatch => {
    dispatch({
      type: NEXT_SONG
    })
  }
}

export const playPrevSong = () => {
  return dispatch => {
    dispatch({
      type: PREVIOUS_SONG
    })
  }
}

export const playListSongSelect = ( selectedSongID ) => {
  return dispatch => {
    dispatch({
      type: PLAYLIST_SONG_SELECT,
      payload: selectedSongID
    })
  }
}

export const startTimer = () => {
  return dispatch => {
    clearInterval(timer)
    timer = setInterval(() => dispatch(tick()), 1000);
    dispatch({ type: TIMER_START });
  }
}


export const tick = () => {
  return dispatch => {
    dispatch({
      type: TIMER_TICK
    })
  }
}

export const stopTimer = () => {
  return dispatch => {
    clearInterval(timer)
    dispatch({
      type: TIMER_STOP
    })
  }
}

export const pauseTimer = () => {
  return dispatch => {
    clearInterval(timer)
    dispatch({
      type: TIMER_PAUSE
    })
  }
}

export const resumeTimer = () => {
  return dispatch => {
    clearInterval(timer)
    timer = setInterval(() => dispatch(tick()), 1000);
    dispatch({ type: TIMER_RESUME });
  }
}

export const getFileInfo = ( fileInfo ) => {
  return dispatch => {
    dispatch({
      type: GET_FILE_INFO,
      payload: fileInfo
    })
  }
}

export const getPlaylistItem = ( item ) => {
  return dispatch => {
    dispatch({
      type: GET_PLAYLIST_ITEM,
      payload: item
    })
  }

}