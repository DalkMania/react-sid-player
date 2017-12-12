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
getFileInfo
} from '../../modules/player'

import PlayList from '../playlist'
import './style.css'


class Player extends Component {

  componentWillMount = () => {
    window.setupSIDPlayer()
    window.SIDplayer.loadinit( process.env.PUBLIC_URL + this.props.active.file, 0)
  }

  componentDidMount = () => {
    let playButton = document.getElementById('playpause')
    playButton.addEventListener('click', this.toggle.bind(this))
    window.addEventListener('load', this.handleLoad.bind(this))
  }

  componentWillReceiveProps = ( nextProps ) => {
    if(nextProps.playing !== this.props.playing && this.props.playing === false && this.props.currentSongTime === 0 && nextProps.current === this.props.current) {
      this.loadSid(this.props.active.file, this.props.current)
      setTimeout(() => {
        let fileInfo = {SidTitle: this.getSIDTitle(), SidAuthor: this.getSIDAuthor(), SidInfomation: this.getSIDInfo()}
        this.props.getFileInfo( fileInfo )
      }, 100)
      this.start(this.props.current)
      this.props.startTimer()
    }

    if(nextProps.playing !== this.props.playing && this.props.playing === false && this.props.currentSongTime === 0 && nextProps.current === !this.props.current) {
      this.stop()
      this.loadSid(nextProps.active.file, nextProps.current)
      setTimeout(() => {
        let fileInfo = {SidTitle: this.getSIDTitle(), SidAuthor: this.getSIDAuthor(), SidInfomation: this.getSIDInfo()}
        this.props.getFileInfo( fileInfo )
      }, 100)
      this.start(nextProps.current)
      this.props.startTimer()

    }

    if(nextProps.current === this.props.current && nextProps.playing !== this.props.playing && this.props.playing === true) {
      this.pause()
      this.props.pauseTimer()
    }

    if(nextProps.current === this.props.current && nextProps.playing === true && this.props.playing === false && nextProps.pause === false && this.props.pause === true) {
      this.play()
      this.props.resumeTimer()
    }

    if(nextProps.current !== this.props.current && nextProps.currentSongTime === 0) {
      this.stop()
      this.loadSid(nextProps.active.file, nextProps.current)
      setTimeout(() => {
        let fileInfo = {SidTitle: this.getSIDTitle(), SidAuthor: this.getSIDAuthor(), SidInfomation: this.getSIDInfo()}
        this.props.getFileInfo( fileInfo )
      }, 100)
      this.start(nextProps.current)
      this.props.startTimer()
    }

    if(nextProps.currentSongTotalTime === this.props.currentSongTime) {
      this.stop()
      this.props.playNextSong()
    }
  }

  handleLoad = () => {
    let fileInfo = {SidTitle: this.getSIDTitle(), SidAuthor: this.getSIDAuthor(), SidInfomation: this.getSIDInfo()}
    this.props.getFileInfo( fileInfo )
  }

  componentWillUnmount = () => {
    this.stop()
    this.props.stopTimer()
    let playButton = document.getElementById('playpause')
    playButton.removeEventListener('click', this.toggle)
    window.removeEventListener('load', this.handleLoad)
  }

  play = ( subtune ) => {
    window.SIDplayer.playcont( subtune )
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

  toggle = () => {
    if( this.props.playing === true ) {
      this.pause()
    } else {
      this.play()
    }
  }

  getSIDTitle = () => {
    return window.SIDplayer.gettitle()
  }

  getSIDAuthor = () => {
    return window.SIDplayer.getauthor()
  }

  getSIDInfo = () => {
    return window.SIDplayer.getinfo()
  }

  render() {
    const { playing, playlistOpen } = this.props
    let playerClass = classnames({'show': playlistOpen}, {'hidden': !playlistOpen})
    let playPauseClass = classnames('fa', {'fa-pause': playing}, {'fa-play': !playing})
    return (
      <div className="player-container">
        <div id="player" className={ playerClass }>
          <div id="main">
            <div>
              <div className="playback_controls">
                <h2 id="title">{ this.props.fileInfo.SidTitle } - { this.props.active.title }</h2>
                <h3 id="artist">{ this.props.fileInfo.SidAuthor } - { this.props.fileInfo.SidInfomation }</h3>
                <div className="time-holder">
                  <div className="slider">
                    <div className="fill" style={{width: this.props.currentSongProgress + '%'}} ></div>
                  </div>
                </div>
                <div>
                  <i onClick={ this.props.showPlayList } className="fa fa-bars menu"></i>
                  <div className="buttons">
                    <i onClick={this.props.playPrevSong} className="fa fa-step-backward" id="back"></i>
                    <i onClick={this.props.togglePlaying} className={ playPauseClass } id="playpause"></i>
                    <i onClick={this.props.playNextSong} className="fa fa-step-forward" id="next"></i>
                  </div>
                </div>
              </div>
              <audio id="playbar" controls></audio>
            </div>
          </div>
            <PlayList songs={ this.props.songs } current={ this.props.active.id } />
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
      fileInfo: state.player.fileInfo,
      active: state.player.active,
      current: state.player.current,
      currentSongTime: state.player.currentSongTime,
      currentSongProgress: state.player.currentSongProgress,
      currentSongTotalTime: state.player.currentSongTotalTime,
      playing: state.player.playing,
      pause: state.player.pause,
      playlistOpen: state.player.playlistOpen,
      songs: state.player.songs,
      loaded: state.player.loaded,
      currentPage: state.player.currentPage
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
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
