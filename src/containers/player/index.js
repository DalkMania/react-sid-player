import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import {
showPlayList,
togglePlaying,
playNextSong,
playPrevSong,
startTimer,
stopTimer,
pauseTimer,
resumeTimer,
tick,
getFileInfo,
getPlaylistItem
} from '../../actions/player'
import { ReactComponent as PlayButton } from '../../assets/svg/play-solid.svg'
import { ReactComponent as PauseButton } from '../../assets/svg/pause-solid.svg'
import { ReactComponent as Forward } from '../../assets/svg/step-forward-solid.svg'
import { ReactComponent as Backward } from '../../assets/svg/step-backward-solid.svg'
import { ReactComponent as Bars } from '../../assets/svg/bars-solid.svg'

import PlayList from '../playlist'
import '../../assets/css/player.css'


class Player extends Component {

  componentDidMount = () => {
    window.setupSIDPlayer()
    this.getPlayItem()
    window.SIDplayer.loadinit( process.env.PUBLIC_URL + this.props.soundtrack.file, 0)
  }

  getSnapshotBeforeUpdate = ( prevProps, prevState ) => {
    if(this.props.playing !== prevProps.playing && prevProps.playing === false && prevProps.currentSongTime === 0 && this.props.current === prevProps.current) {
      this.loadSid(prevProps.soundtrack.file, prevProps.subtune)
      setTimeout(() => {
        let fileInfo = {SidTitle: this.getSIDTitle(), SidAuthor: this.getSIDAuthor(), SidInfomation: this.getSIDInfo()}
        prevProps.getFileInfo( fileInfo )
      }, 100)
      this.start(this.props.subtune)
      prevProps.startTimer()
    }

    if(this.props.playing !== prevProps.playing && prevProps.playing === false && prevProps.currentSongTime === 0 && this.props.current === !prevProps.current) {
      this.stop()
      this.loadSid(this.props.soundtrack.file, this.props.subtune)
      setTimeout(() => {
        let fileInfo = {SidTitle: this.getSIDTitle(), SidAuthor: this.getSIDAuthor(), SidInfomation: this.getSIDInfo()}
        this.props.getFileInfo( fileInfo )
      }, 100)
      this.start(this.props.subtune)
      this.props.startTimer()

    }

    if(this.props.current === prevProps.current && this.props.playing !== prevProps.playing && prevProps.playing === true) {
      this.pause()
      this.props.pauseTimer()
    }

    if(this.props.current === prevProps.current && this.props.playing === true && prevProps.playing === false && this.props.pause === false && prevProps.pause === true) {
      this.play()
      this.props.resumeTimer()
    }

    if(this.props.current !== prevProps.current && this.props.currentSongTime === 0) {
      this.stop()
      this.loadSid(this.props.soundtrack.file, this.props.subtune)
      setTimeout(() => {
        let fileInfo = {SidTitle: this.getSIDTitle(), SidAuthor: this.getSIDAuthor(), SidInfomation: this.getSIDInfo()}
        this.props.getFileInfo( fileInfo )
      }, 100)
      this.start(this.props.subtune)
      this.props.startTimer()
    }

    if(this.props.currentSongTotalTime === prevProps.currentSongTime) {
      this.stop()
      this.props.playNextSong()
      this.props.startTimer()
    }

    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.playing !== prevProps.playing && prevProps.playing === false && prevProps.currentSongTime === 0 && this.props.current === prevProps.current) {
      this.loadSid(prevProps.soundtrack.file, prevProps.subtune)
      setTimeout(() => {
        let fileInfo = {SidTitle: this.getSIDTitle(), SidAuthor: this.getSIDAuthor(), SidInfomation: this.getSIDInfo()}
        prevProps.getFileInfo( fileInfo )
      }, 100)
      this.start(this.props.subtune)
      prevProps.startTimer()
    }

    if(this.props.playing !== prevProps.playing && prevProps.playing === false && prevProps.currentSongTime === 0 && this.props.current === !prevProps.current) {
      this.stop()
      this.loadSid(this.props.soundtrack.file, this.props.subtune)
      setTimeout(() => {
        let fileInfo = {SidTitle: this.getSIDTitle(), SidAuthor: this.getSIDAuthor(), SidInfomation: this.getSIDInfo()}
        this.props.getFileInfo( fileInfo )
      }, 100)
      this.start(this.props.subtune)
      this.props.startTimer()

    }

    if(this.props.current === prevProps.current && this.props.playing !== prevProps.playing && prevProps.playing === true) {
      this.pause()
      this.props.pauseTimer()
    }

    if(this.props.current === prevProps.current && this.props.playing === true && prevProps.playing === false && this.props.pause === false && prevProps.pause === true) {
      this.play()
      this.props.resumeTimer()
    }

    if(this.props.current !== prevProps.current && this.props.currentSongTime === 0) {
      this.stop()
      this.loadSid(this.props.soundtrack.file, this.props.subtune)
      setTimeout(() => {
        let fileInfo = {SidTitle: this.getSIDTitle(), SidAuthor: this.getSIDAuthor(), SidInfomation: this.getSIDInfo()}
        this.props.getFileInfo( fileInfo )
      }, 100)
      this.start(this.props.subtune)
      this.props.startTimer()
    }

    if(this.props.currentSongTotalTime === prevProps.currentSongTime) {
      this.stop()
      this.props.playNextSong()
      this.props.startTimer()
    }

    return null
  }

  componentWillUnmount = () => {
    this.stop()
    this.props.stopTimer()
    this.props.getFileInfo( {} )
    window.SIDplayer = null
  }

  play = () => {
    window.SIDplayer.playcont()
  }

  loadSid = ( path, subtune ) => {
     window.SIDplayer.loadinit( process.env.PUBLIC_URL + path, subtune)
  }

  pause = () => {
    window.SIDplayer.pause()
  }

  stop = () => {
    window.SIDplayer.stop()
  }

  start = ( subtune ) => {
    window.SIDplayer.start( subtune )
  }

  getSIDTitle = () => {
    return window.SIDplayer.gettitle().replace(/\0/g, '');
  }

  getSIDAuthor = () => {
    return window.SIDplayer.getauthor().replace(/\0/g, '');
  }

  getSIDInfo = () => {
    return window.SIDplayer.getinfo().replace(/\0/g, '');
  }

  getSidInfo = () => {
    setTimeout(() => {
      let fileInfo = {SidTitle: this.getSIDTitle(), SidAuthor: this.getSIDAuthor(), SidInfomation: this.getSIDInfo()}
      this.props.getFileInfo( fileInfo )
    }, 100)
  }

  getPlayItem = () => {
    this.props.getPlaylistItem( this.props.match.params.id )
  }

  playOrPause = () => {
    if(!this.props.playing) {
      return <PlayButton />
    } else {
      return <PauseButton />
    }
  }

  render() {
    const { playlistOpen } = this.props
    let playerClass = classnames({'show': playlistOpen}, {'hidden': !playlistOpen})
    return (
      <div className="player-container">
        <div id="player" className={ playerClass }>
          <div id="main" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + this.props.soundtrack.poster})` }}>
            <div>
              <div className="playback_controls">
                <h2 id="title">{ this.props.soundtrack.album } - { this.props.active.title }</h2>
                <h3 id="artist">{ this.props.fileInfo.SidAuthor } - { this.props.fileInfo.SidInfomation }</h3>
                <div className="time-holder">
                  <div className="slider">
                    <div className="fill" style={{width: this.props.currentSongProgress + '%'}} ></div>
                  </div>
                </div>
                <div>
                  <i onClick={ this.props.showPlayList } className="fa fa-bars menu"><Bars /></i>
                  <div className="buttons">
                    <i onClick={this.props.playPrevSong} id="back"><Backward /></i>
                    <i onClick={this.props.togglePlaying} id="playpause">{this.playOrPause()}</i>
                    <i onClick={this.props.playNextSong} id="next"><Forward /></i>
                  </div>
                </div>
              </div>
              <audio id="playbar" controls></audio>
            </div>
          </div>
            <PlayList active={this.props.match.params.id} songs={ this.props.songs } current={ this.props.active.id } />
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
      fileInfo: state.player.fileInfo,
      soundtracks: state.player.soundtracks,
      soundtrack: state.player.soundtrack,
      active: state.player.active,
      current: state.player.current,
      subtune: state.player.subtune,
      currentSongTime: state.player.currentSongTime,
      currentSongProgress: state.player.currentSongProgress,
      currentSongTotalTime: state.player.currentSongTotalTime,
      playing: state.player.playing,
      pause: state.player.pause,
      playlistOpen: state.player.playlistOpen,
      songs: state.player.songs,
      loaded: state.player.loaded
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showPlayList,
  togglePlaying,
  playNextSong,
  playPrevSong,
  startTimer,
  stopTimer,
  pauseTimer,
  resumeTimer,
  tick,
  getFileInfo,
  getPlaylistItem
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
