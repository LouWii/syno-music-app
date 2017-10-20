import React from 'react';
import { as } from '../utils/syno-api'
import '../styles/Player.global.css'

class Player extends React.Component {
  constructor(props) {
    super(props)

    this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this)

    const songs = null
    const playSongIdx = null
    const songUrl = ''
    const playing = false
    this.state = {songs, playSongIdx, songUrl, playing}
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.songIdx && this.props.songs[this.props.songIdx]) {
      const songUrl = as.getStreamSongUrl(this.props.profile, this.props.songs[this.props.songIdx].id)
      // const songUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3'
      if (this.state.songUrl != songUrl) {
        console.log(songUrl)
        this.setState({songUrl})
      }
    }
  }

  handlePlayPauseClick() {
    let audio = document.getElementById('audio')
    if (this.state.playing) {
      audio.pause()
      this.setState({playing: false})
    } else {
      audio.play()
      this.setState({playing: true})
    }
    // console.log(audio.currentSrc, audio.currentTime, audio.duration)
  }

  render() {
    return (
      <div className="player">
        <button onClick={this.handlePlayPauseClick} type="button">Play</button>
        { (this.props.songIdx || this.props.songIdx === 0) &&
        <audio id="audio" src={this.state.songUrl} ></audio>
        }
        { (this.props.songIdx || this.props.songIdx === 0) &&
        <p><small>{this.props.songs[this.props.songIdx].title}</small></p>
        }
      </div>
    )
  }
}

export default Player