import React from 'react';
import SongsList from './SongsList'
import '../styles/ASClient.global.css'

class ASClient extends React.Component {
  constructor(props) {
    super(props)

    this.handleArtistSelect = this.handleArtistSelect.bind(this)
    this.handleAlbumSelect = this.handleAlbumSelect.bind(this)
    this.handlePlaySong = this.handlePlaySong.bind(this)

    const { idx } = this.props.params;
    const profile = this.props.profiles[idx];
    const selectedArtist = null
    const selectedArtistName = null
    const selectedAlbum = null
    const selectedAlbumIdx = null
    const selectedSongIdx = null
    this.state = { profile, idx, selectedArtist, selectedArtistName, selectedAlbum, selectedAlbumIdx, selectedSongIdx }
  }

  handleArtistSelect(event) {
    if (event.target.value && event.target.value !== '') {
      const artistIdx = parseInt(event.target.value, 10)
      const artist = this.props.client.artists[artistIdx]
      if (!this.props.client.albums[artist.name] || !this.props.client.albums[artist.name].length) {
        this.props.uiShowLoadingOverlay()
        this.props.clientListArtistAlbums(this.state.profile, artist.name)
      }
      this.setState({selectedArtist: artistIdx, selectedArtistName: artist.name})
    }
  }

  handleAlbumSelect(event) {
    if (event.target.value && event.target.value !== '') {
      const albumIdx = parseInt(event.target.value, 10)
      const album = this.props.client.albums[this.state.selectedArtistName][albumIdx]
      this.props.uiShowLoadingOverlay()
      this.props.clientListAlbumSongs(this.state.profile, this.state.selectedArtistName, album.name, album.album_artist)

      this.setState({selectedAlbum: album, selectedAlbumIdx: albumIdx})
    }
  }

  handlePlaySong(songIdx) {
    const songs = this.props.client.albums[this.state.selectedArtistName][this.state.selectedAlbumIdx].songs
    const playlistId = this.state.selectedArtistName+'_-_'+this.state.selectedAlbum.name+'-_-'+songs.length
    if (this.props.player.currentPlaylistId != playlistId) {
      this.props.setPlayerSongs(
        songs,
        playlistId
      )
    }
    this.props.setPlayerCurrentSong(songIdx)
    this.setState({selectedSongIdx: songIdx})
  }

  componentDidMount() {
    this.props.selectClientProfile(this.state.idx)
    this.props.asclientLogin(this.state.profile)
  }

  render() {
    const artistHasAlbums = (this.state.selectedArtist
      && this.props.client.artists
      && this.props.client.artists[this.state.selectedArtist]
      && this.props.client.albums[this.state.selectedArtistName]
      && this.props.client.albums[this.state.selectedArtistName].length)
    const albumHasSongs = (artistHasAlbums
      && (typeof this.state.selectedAlbumIdx === 'number' && (this.state.selectedAlbumIdx%1) === 0)
      && this.props.client.albums[this.state.selectedArtistName][this.state.selectedAlbumIdx]
      && this.props.client.albums[this.state.selectedArtistName][this.state.selectedAlbumIdx].songs
      && this.props.client.albums[this.state.selectedArtistName][this.state.selectedAlbumIdx].songs.length
    )
    return (
      <div className="asclient" ref="client">
        <div className="form-inline">
          <div className="form-group">
            <label htmlFor="artists-list">Artists</label>
            <select id="artists-list" className="form-control" onChange={this.handleArtistSelect}>
              <option value="">-- Artists --</option>
              {this.props.client.artists.map(function(element, idx) {
                return <option key={idx} value={idx}>{element.name}</option>
              })}
            </select>
          </div>
        </div>
        <div className="form-inline albums-selector">
          {artistHasAlbums
            &&
            <div className="form-group">
              <label htmlFor="albums-list">Albums</label>
              <select id="albums-list" className="form-control" onChange={this.handleAlbumSelect}>
                <option value="">-- Albums --</option>
                {this.props.client.albums[this.state.selectedArtistName].map(function(element, idx){
                    return <option key={idx} value={idx}>{element.name}</option>
                  })
                  }
              </select>
            </div>
          }
        </div>
        {albumHasSongs &&
          <SongsList
            songs={this.props.client.albums[this.state.selectedArtistName][this.state.selectedAlbumIdx].songs}
            handlePlaySong={this.handlePlaySong}
          />
        }
      </div>
    )
  }
}

export default ASClient