import React from 'react';
import { as } from '../utils/syno-api'
import {getHumanDuration} from '../utils/utils'
import '../styles/Player.global.css'

class Player extends React.Component {
  constructor(props) {
    super(props)

    this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)

    const songUrl = '',
      currentSongTime = 0,
      playerIntervalId= null
    this.state = {songUrl, currentSongTime, playerIntervalId}
  }

  componentDidMount() {
    // Init our Audio tag events
    let audio = document.getElementById('audio')
    let _this = this
    audio.addEventListener('ended', function(){
      if (_this.props.player.currentSongIdx < _this.props.player.songs.length-1) {
        // If there's a next song, play it
        _this.props.playerNext()
      } else {
        // TODO : Stop the player
      }
    });
    const intervalId = setInterval(function() {
      _this.setState({currentSongTime: audio.currentTime})
    }, 100)
    this.setState({playerIntervalId: intervalId})
  }

  componentWillUnmount() {
    clearInterval(this.state.playerIntervalId)
  }

  componentDidUpdate(prevProps, prevState) {
    if ( (this.props.player.currentSongIdx || this.props.player.currentSongIdx === 0) && this.props.player.songs[this.props.player.currentSongIdx]) {
      const songUrl = as.getStreamSongUrl(this.props.profile, this.props.player.songs[this.props.player.currentSongIdx].id)
      // const songUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3'
      if (this.state.songUrl != songUrl) {
        // console.log(songUrl)
        this.setState({songUrl})
      }
    }

    let audio = document.getElementById('audio')
    if (this.props.player.status === 'play') {
      // TODO: catch exception here when audio file isn't accessible
      audio.play()
    } else {
      audio.pause()
    }
    audio.muted = this.props.player.muted
  }

  handlePlayPauseClick() {
    this.props.playerPlayPause()
    // console.log(audio.currentSrc, audio.currentTime, audio.duration)
  }

  handlePrevClick() {
    this.props.playerPrevious()
  }

  handleNextClick() {
    this.props.playerNext()
  }

  handleMuteClick() {
    this.props.playerMuteUnmute();
  }

  render() {
    const playPauseActionText = (this.props.player.status==='play'?<i className="glyphicon glyphicon-pause"></i>:<i className="glyphicon glyphicon-play"></i>)
    let currentSong = null
    let currentSongProgress = 0
    if (this.props.player.currentSongIdx || this.props.player.currentSongIdx === 0) {
      currentSong = this.props.player.songs[this.props.player.currentSongIdx]
      currentSongProgress = Math.floor(this.state.currentSongTime) * 100 / currentSong.additional.song_audio.duration
    }
    return (
      <div className="player">
        <div className="controls">
          <button className="btn-previous" onClick={this.handlePrevClick} type="button"><i className="glyphicon glyphicon-step-backward"></i></button>
          <button className="btn-play" onClick={this.handlePlayPauseClick} type="button">{playPauseActionText}</button>
          <button className="btn-next" onClick={this.handleNextClick} type="button"><i className="glyphicon glyphicon-step-forward"></i></button>
        </div>
        <p style={{display: "none"}}>{this.props.player.songs.length} loaded ({this.props.player.currentPlaylistId}) - Song {this.props.player.currentSongIdx} - Status {this.props.player.status}</p>

        <audio id="audio" src={this.state.songUrl} ></audio>

        <div className="song-progress">
          <div className="song-current-time">{getHumanDuration(this.state.currentSongTime)}</div>
          <div className="song-timebar">
            <div className="timebar-background"><span></span></div>
            <div className="timebar"><span style={{width: currentSongProgress+'%'}}></span></div>
          </div>
          <div className="song-total-time">{getHumanDuration(currentSong.additional.song_audio.duration)}</div>
        </div>
        { currentSong &&
        <p className="playing-song"><span className="song-name">{currentSong.title}</span> <span className="song-artist">{currentSong.additional.song_tag.artist}</span></p>
        }
      </div>
    )
  }
}

export default Player