import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
playListSongSelect
} from '../../actions/player'
import '../../assets/css/playlist.css'

class PlayList extends Component {

  renderPlayList = () => {
    if (this.props.songs.length > 0) {
      return this.props.songs.map((song, index) => (
        <li key={ song.id } className={(this.props.current === song.id) ? 'playing' : null} onClick={() => this.props.playListSongSelect(song.id)} data-id={ song.subtune }> { song.title } <span className="time">{ song.length 
         }</span></li>
      ));
    }

  }

  render() {
    const playlist = this.renderPlayList(this.props.songs);
    return (
      <ol id="playlist">
        { playlist }
      </ol>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  playListSongSelect
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(PlayList)

