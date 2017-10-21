import React from 'react';
import '../styles/SongsList.global.css'

class SongsList extends React.Component {
  constructor(props) {
    super(props)

    this.handlePlayClick = this.handlePlayClick.bind(this)
  }

  humanDuration(duration) {
    var sec_num = parseInt(duration, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours!=='00'?hours+':':'')+minutes+':'+seconds;
  }

  handlePlayClick(event) {
    const songIdx = event.currentTarget.dataset.songIdx
    this.props.handlePlaySong(songIdx)
  }

  render() {
    return (
    <div>
      <table className="songs-list">
        <tbody>
        {this.props.songs.map(function(element, idx){
          const isCurrentSong = (element.id === this.props.player.currentSongId)
          return <tr key={idx} className={isCurrentSong?'current-song':''}>
            <td className="play-cell">
              <button className="bttn bttn-default btn-sm" type="button" onClick={this.handlePlayClick} data-song-idx={idx}><i className="glyphicon glyphicon-play"></i></button>
              <div className="song-playing-icon">
                <div className="bar bar-one"></div>
                <div className="bar bar-two"></div>
                <div className="bar bar-three"></div>
              </div>
            </td>
            <td>{element.title}</td>
            <td className="duration-cell">{this.humanDuration(element.additional.song_audio.duration)}</td>
            </tr>
        }, this)
        }
        </tbody>
      </table>
    </div>
    )
  }
}

export default SongsList