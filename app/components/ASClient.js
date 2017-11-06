import React from 'react'
import SongsList from './SongsList'
import LoadingStatus from './LoadingStatus'
import { hashHistory } from 'react-router'
import '../styles/ASClient.global.scss'

export default class ASClient extends React.Component {
  constructor(props) {
    super(props)

    this.handleArtistClick = this.handleArtistClick.bind(this)
    this.handleArtistBack = this.handleArtistBack.bind(this)
    this.handleAlbumClick = this.handleAlbumClick.bind(this)
    this.handleAlbumBack = this.handleAlbumBack.bind(this)
    this.handlePlaySong = this.handlePlaySong.bind(this)
    this.handleSongBack = this.handleSongBack.bind(this)

    const { idx } = this.props.match.params;
    const profile = this.props.profiles[idx];
    const selectedArtist = null
    const selectedArtistName = null
    // This is only used for the UI, is meant to stay displayed
    const selectedArtistNameUI = ''
    const selectedAlbum = null
    const selectedAlbumIdx = null
    // This is only used for the UI, is meant to stay displayed
    const selectedAlbumNameUI = ''
    const selectedSongIdx = null
    this.state = { profile, idx, selectedArtist, selectedArtistName, selectedArtistNameUI, selectedAlbum, selectedAlbumIdx, selectedAlbumNameUI, selectedSongIdx }
  }

  handleArtistClick(event) {
    const artistIdx = parseInt(event.currentTarget.dataset.idx)
    const artist = this.props.client.artists[artistIdx]
    if (!this.props.client.albums[artist.name] || !this.props.client.albums[artist.name].length) {
      this.props.updateClientLoadingStatus('loadingAlbums')
      this.props.clientListArtistAlbums(this.state.profile, artist.name)
    }
    this.setState({selectedArtist: artistIdx, selectedArtistName: artist.name, selectedArtistNameUI: artist.name})
  }

  handleArtistBack() {
    // TODO: shutdown player
    this.props.playerPause()
    this.props.setPlayerCurrentSong(null)
    this.props.setPlayerSongs(null, null)
    this.props.history.goBack()
  }

  handleAlbumClick(event) {
    const albumIdx = parseInt(event.currentTarget.dataset.idx)
    const album = this.props.client.albums[this.state.selectedArtistName][albumIdx]
    if (!this.props.client.albums[this.state.selectedArtistName][albumIdx].songs
      || !this.props.client.albums[this.state.selectedArtistName][albumIdx].songs.length) {
      this.props.updateClientLoadingStatus('loadingSongs')
      this.props.clientListAlbumSongs(this.state.profile, this.state.selectedArtistName, album.name, album.album_artist)
    }

    this.setState({selectedAlbum: album, selectedAlbumIdx: albumIdx, selectedAlbumNameUI: album.name})
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
        <div className="list-container artists-list-container">
          <header>
            <div className="list-title">
              <button className="btn-no-background" onClick={this.handleArtistBack}>
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              </button>
              Artists
            </div>
          </header>
          <div className="content">
            {(this.props.client.loadingStatus === 'loggingIn' || this.props.client.loadingStatus === 'loadingArtists') &&
              <LoadingStatus status={this.props.client.loadingStatus} />
            }
            <ul className="artists-list">
              {this.props.client.artists && this.props.client.artists.map(function(element, idx) {
                if(element.name !== '') return <li className="list-item" key={idx} ><button onClick={this.handleArtistClick} data-idx={idx}>{element.name}</button></li>
              }, this)}
            </ul>
          </div>
        </div>
        <div className={"list-container sliding-container albums-list-container"+(this.state.selectedArtistName?' active':'')}>
          <header>
            <div className="list-subtitle">{this.state.selectedArtistNameUI}</div>
            <div className="list-title">
              <button className="btn-no-background" onClick={this.handleAlbumBack}>
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              </button>
              Albums
            </div>
          </header>
          <div className="content">
            {(this.props.client.loadingStatus === 'loadingAlbums') &&
              <LoadingStatus status={this.props.client.loadingStatus} />
            }
            <ul className="albums-list">
              {artistHasAlbums && this.props.client.albums[this.state.selectedArtistName].map(function(element, idx){
                const itemSub = this.state.selectedArtistName + ((element.year && element.year !== 0)?' - '+element.year:'')
                return (
                  <li className="list-item" key={idx}>
                    <button onClick={this.handleAlbumClick} data-idx={idx}>
                      {element.name}
                      <span className="sub-content">{itemSub}</span>
                    </button>
                  </li>
                )
              }, this)}
            </ul>
          </div>
        </div>
        <div className={"list-container sliding-container songs-list-container"+(this.state.selectedAlbum?' active':'')}>
          <header>
            <div className="list-subtitle">{this.state.selectedArtistNameUI} - {this.state.selectedAlbumNameUI}</div>
            <div className="list-title">
              <button className="btn-no-background" onClick={this.handleSongBack}>
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              </button>
              Songs
            </div>
          </header>
          <div className="content">
            {(this.props.client.loadingStatus === 'loadingSongs') &&
              <LoadingStatus status={this.props.client.loadingStatus} />
            }
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