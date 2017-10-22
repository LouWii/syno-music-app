import React from 'react';
import SongsList from './SongsList'
import { hashHistory } from 'react-router'
import '../styles/ASClient.global.css'

class ASClient extends React.Component {
  constructor(props) {
    super(props)

    this.handleArtistSelect = this.handleArtistSelect.bind(this)
    this.handleArtistClick = this.handleArtistClick.bind(this)
    this.handleArtistBack = this.handleArtistBack.bind(this)
    this.handleAlbumSelect = this.handleAlbumSelect.bind(this)
    this.handleAlbumClick = this.handleAlbumClick.bind(this)
    this.handleAlbumBack = this.handleAlbumBack.bind(this)
    this.handlePlaySong = this.handlePlaySong.bind(this)
    this.handleSongBack = this.handleSongBack.bind(this)

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

  handleArtistClick(event) {
    const artistIdx = parseInt(event.currentTarget.dataset.idx)
    const artist = this.props.client.artists[artistIdx]
    if (!this.props.client.albums[artist.name] || !this.props.client.albums[artist.name].length) {
      this.props.uiShowLoadingOverlay()
      this.props.clientListArtistAlbums(this.state.profile, artist.name)
    }
    this.setState({selectedArtist: artistIdx, selectedArtistName: artist.name})
  }

  handleArtistBack() {
    // TODO: shutdown player
    hashHistory.goBack()
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

  handleAlbumClick(event) {
    const albumIdx = parseInt(event.currentTarget.dataset.idx)
    const album = this.props.client.albums[this.state.selectedArtistName][albumIdx]
    this.props.uiShowLoadingOverlay()
    this.props.clientListAlbumSongs(this.state.profile, this.state.selectedArtistName, album.name, album.album_artist)

    this.setState({selectedAlbum: album, selectedAlbumIdx: albumIdx})
  }

  handleAlbumBack() {
    this.setState({selectedArtist: null, selectedArtistName: null})
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
    // Delay Play action because it's faster than setting the current song and will fail
    let _this = this
    setTimeout(function() {
      _this.props.playerPlay()
    }, 400);
    this.setState({selectedSongIdx: songIdx})
  }

  handleSongBack() {
    this.setState({selectedAlbum: null, selectedAlbumIdx: null})
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
        {/* <div className="form-inline">
          <div className="form-group">
            <label htmlFor="artists-list">Artists</label>
            <select id="artists-list" className="form-control" onChange={this.handleArtistSelect}>
              <option value="">-- Artists --</option>
              {this.props.client.artists.map(function(element, idx) {
                return <option key={idx} value={idx}>{element.name}</option>
              })}
            </select>
          </div>
        </div> */}
        <div className="list-container artists-list-container">
          <header>
            <h4>
              <button className="btn-no-background" onClick={this.handleArtistBack}>
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              </button>
              Artists
            </h4>
          </header>
          <div className="content">
            <ul className="artists-list">
              {this.props.client.artists && this.props.client.artists.map(function(element, idx) {
                return <li key={idx} ><button onClick={this.handleArtistClick} data-idx={idx}>{element.name}</button></li>
              }, this)}
            </ul>
          </div>
        </div>
        {/* <div className="form-inline albums-selector">
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
        </div> */}
        <div className={"list-container sliding-container albums-list-container"+(this.state.selectedArtistName?' active':'')}>
          <header>
            <h5>{this.state.selectedArtistName}</h5>
            <h4>
              <button className="btn-no-background" onClick={this.handleAlbumBack}>
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              </button>
              Albums
            </h4>
          </header>
          <div className="content">
            <ul className="albums-list">
              {artistHasAlbums && this.props.client.albums[this.state.selectedArtistName].map(function(element, idx){
                return <li key={idx}><button onClick={this.handleAlbumClick} data-idx={idx}>{element.name}</button></li>
              }, this)}
            </ul>
          </div>
        </div>
        {/* {albumHasSongs &&
          <SongsList
            songs={this.props.client.albums[this.state.selectedArtistName][this.state.selectedAlbumIdx].songs}
            handlePlaySong={this.handlePlaySong}
            player={this.props.player}
          />
        } */}
        <div className={"list-container sliding-container songs-list-container"+(this.state.selectedAlbum?' active':'')}>
          <header>
            {albumHasSongs && <h5>{this.state.selectedArtistName} - {this.state.selectedAlbum.name}</h5>}
            <h4>
              <button className="btn-no-background" onClick={this.handleSongBack}>
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              </button>
              Songs
            </h4>
          </header>
          <div className="content">
            <ul className="albums-list">
              {albumHasSongs &&
                <SongsList
                  songs={this.props.client.albums[this.state.selectedArtistName][this.state.selectedAlbumIdx].songs}
                  handlePlaySong={this.handlePlaySong}
                  player={this.props.player}
                />
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default ASClient