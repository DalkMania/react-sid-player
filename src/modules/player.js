import songs from '../playlist.json'
import moment from 'moment'


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
export const GET_FILE_INFO = 'player/GET_FILE_INFO'

const initialState = {
  fileInfo: {},
  active: songs[0],
  current: songs[0].id,
  subtune: songs[0].subtune,
  currentSongTime:0,
  currentSongProgress:0,
  currentSongTotalTime: moment.duration(songs[0].length).asSeconds(),
  playing: false,
  pause: true,
  playlistOpen: false,
  songs: songs,
  loaded: false,
}

let timer = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PLAYLIST:
      return {
        ...state,
        playlistOpen: !state.playlistOpen
      }
    case TOGGLE_PLAYING:
      return {
        ...state,
        playing: !state.playing,
        pause: !state.pause,
        currentSongTime: state.currentSongTime,
        currentSongProgress:state.currentSongProgress
      }
    case NEXT_SONG:
      var next_song
      if( state.current === (state.songs.length -1)) {
        next_song = 0
      } else {
        next_song = state.current + 1
      }
      return {
        ...state,
        active: state.songs[next_song],
        current: state.songs[next_song].id,
        subtune: state.songs[next_song].subtune,
        currentSongTime:0,
        currentSongProgress:0,
        currentSongTotalTime:  moment.duration(state.songs[next_song].length).asSeconds(),
        playing: true,
        pause: false
      }
    case PREVIOUS_SONG:
      var prev_song
      if( state.current === 0) {
        prev_song = (state.songs.length -1)
      } else {
        prev_song = state.current - 1
      }
      return {
        ...state,
        active: state.songs[prev_song],
        current: state.songs[prev_song].id,
        subtune: state.songs[prev_song].subtune,
        currentSongTime:0,
        currentSongProgress:0,
        currentSongTotalTime: moment.duration(state.songs[prev_song].length).asSeconds(),
        playing: true,
        pause: false
      }
    case PLAYLIST_SONG_SELECT:
      return {
        ...state,
        current: action.payload,
        active: state.songs[action.payload],
        currentSongTime:0,
        currentSongProgress:0,
        currentSongTotalTime: moment.duration(state.songs[action.payload].length).asSeconds(),
        playing: true,
        pause: false
      }
    case TIMER_START:
      return {
        ...state,
        currentSongTime:0,
        currentSongProgress:0
      }
    case TIMER_TICK:
      return {
        ...state,
        currentSongTime: state.currentSongTime +1,
        currentSongProgress: ((state.currentSongTime +1) / state.currentSongTotalTime) * 100,
      }
    case TIMER_STOP:
      return {
        ...state,
        currentSongTime:0,
        currentSongProgress:0,
        pause: true,
        playing: false

      }
    case TIMER_PAUSE:
      return {
        ...state,
        currentSongTime:state.currentSongTime,
        currentSongProgress:state.currentSongProgress,
        pause: true,
        playing: false
      }
    case TIMER_RESUME:
      return {
        ...state,
        currentSongTime:state.currentSongTime,
        currentSongProgress:state.currentSongProgress,
        pause: false,
        playing: true
      }
    case GET_FILE_INFO:
      return {
        ...state,
        fileInfo: action.payload,
        loaded: true
      }
    default:
      return state
  }
}

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
    clearInterval(timer);
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
