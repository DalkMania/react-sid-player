import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import '../assets/css/playlist.css'

const PlayList = () => {
    const {
        playListSongSelect,
        songs,
        current
    } = useContext(GlobalContext)

    const renderPlayList = (songs, current) => {
        if (songs.length > 0) {
          return songs.map((song, index) => (
            <li key={ song.id } className={(current === song.id) ? 'playing' : null} onClick={() => playListSongSelect(song.id)} data-id={ song.subtune }> { song.title } <span className="time">{ song.length 
             }</span></li>
          ));
        }
    }

    const playlist = renderPlayList(songs, current)
    return (
        <ol id="playlist">
          {playlist}
        </ol>
    )
}

export default PlayList