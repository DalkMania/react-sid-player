import { toSeconds } from '../helpers'

export default (state, action) => {
  switch (action.type) {
    case 'SHOW_PLAYLIST':
      return {
        ...state,
        playlistOpen: !state.playlistOpen
      }
    case 'TOGGLE_PLAYING':
      return {
        ...state,
        playing: !state.playing,
        pause: !state.pause,
        currentSongTime: state.currentSongTime,
        currentSongProgress:state.currentSongProgress
      }
    case 'NEXT_SONG':
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
        currentSongTotalTime: toSeconds(state.songs[next_song].length),
        playing: true,
        pause: false
      }
    case 'PREVIOUS_SONG':
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
        currentSongTotalTime: toSeconds(state.songs[prev_song].length),
        playing: true,
        pause: false
      }
    case 'PLAYLIST_SONG_SELECT':
      return {
        ...state,
        active: state.songs[action.payload],
        current: state.songs[action.payload].id,
        subtune: state.songs[action.payload].subtune,
        currentSongTime:0,
        currentSongProgress:0,
        currentSongTotalTime: toSeconds(state.songs[action.payload].length),
        playing: true,
        pause: false
      }
    case 'TIMER_START':
      return {
        ...state,
        currentSongTime:0,
        currentSongProgress:0
      }
    case 'TIMER_TICK':
      return {
        ...state,
        currentSongTime: state.currentSongTime +1,
        currentSongProgress: ((state.currentSongTime  / state.currentSongTotalTime) * 100),
      }
    case 'TIMER_STOP':
      return {
        ...state,
        currentSongTime:0,
        currentSongProgress:0,
        pause: true,
        playing: false

      }
    case 'TIMER_PAUSE':
      return {
        ...state,
        currentSongTime:state.currentSongTime,
        currentSongProgress:state.currentSongProgress,
        pause: true,
        playing: false
      }
    case 'TIMER_RESUME':
      return {
        ...state,
        currentSongTime:state.currentSongTime,
        currentSongProgress:state.currentSongProgress,
        pause: false,
        playing: true
      }
      case 'TIMER_RESET':
        return {
          ...state,
          currentSongTime:0,
          currentSongProgress:0,
          pause: true,
          playing: false
        }
    case 'GET_FILE_INFO':
      return {
        ...state,
        fileInfo: action.payload,
        loaded: true
      }
    case 'GET_PLAYLIST_ITEM':
      return {
        ...state,
        soundtrack: state.soundtracks[action.payload -1],
        active: state.soundtracks[action.payload -1].songs[0],
        current: state.soundtracks[action.payload -1].songs[0].id,
        subtune: state.soundtracks[action.payload -1].songs[0].subtune,
        songs: state.soundtracks[action.payload -1].songs,
        currentSongTotalTime: toSeconds(state.soundtracks[action.payload -1].songs[0].length)

      }
      default:
        return state;
    }
  }