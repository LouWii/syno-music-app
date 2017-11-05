import React from 'react'
import {getHumanDuration} from '../utils/utils'
import '../styles/SongsList.global.scss'

export default class SongsList extends React.Component {
  constructor(props) {
    super(props)

    this.handlePlayClick = this.handlePlayClick.bind(this)
  }

  handlePlayClick(event) {
    const songIdx = event.currentTarget.dataset.songIdx
    this.props.handlePlaySong(songIdx)
  }

  render() {
    return (
    <div>
      <div className="songs-list-container">
        <ul className="songs-list">
        {this.props.songs.map(function(element, idx){
          const isCurrentSong = (element.id === this.props.player.currentSongId)
          return <li key={idx} className={isCurrentSong?'current-song':''}>
            <div className="play-cell">
              {!isCurrentSong &&
                <button className="bttn bttn-default btn-sm" type="button" onClick={this.handlePlayClick} data-song-idx={idx}><i className="glyphicon glyphicon-play"></i></button>}
              {isCurrentSong &&
                <div className={"song-playing-icon"+(this.props.player.status==='play'?'':' paused')}>
                  <div className="bar bar-one"></div>
                  <div className="bar bar-two"></div>
                  <div className="bar bar-three"></div>
                </div>}
            </div>
            <div className="title-cell">{element.title}</div>
            <div className="duration-cell">{getHumanDuration(element.additional.song_audio.duration)}</div>
            </li>
        }, this)
        }
        </ul>
      </div>
    </div>
    )
  }
}
