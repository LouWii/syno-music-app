
function clients(state = [], action) {
  switch(action.type){
    case 'CLIENT_LOGGEDIN': // Client is logged in to Syno NAS
      return Object.assign({}, state, {
        clientSID: action.sid
      })
    case 'CLIENT_LOADING': // Client big loading (loading overlay)
      return Object.assign({}, state, {
        clientIsLoading: true
      })
    case 'CLIENT_LOADED': // Client big loading done
      return Object.assign({}, state, {
        clientIsLoading: false
      })
    case 'CLIENT_UPDATE_LOADING_STATUS':
      return Object.assign({}, state, {loadingStatus: action.status})
    case 'ARTISTS_LIST_UPDATE':
      return Object.assign({}, state, {
        artists: action.artistsList
      })
    case 'ARTIST_ALBUMS_LIST_UPDATE':
      let albumsArtist = Object.assign({}, state.albums, {})
      albumsArtist[action.artist] = action.albums
      return Object.assign({}, state, {
        albums: albumsArtist
      })
    case 'ALBUM_SONGS_LIST_UPDATE':
      let newStateWithSongs = null
      if (state.albums[action.artist] && state.albums[action.artist].length) {
        state.albums[action.artist].forEach(function(element, idx) {
          // console.log(element.album_artist, action.albumArtist, element.name, action.album)
          if (element.album_artist === action.albumArtist
            // && element.artist === action.artist // this is because we receives albums with artist attr always empty...
            && element.name === action.album) {
              let albumSongs = Object.assign({}, element, {songs: action.songs})
              // console.log(albumSongs)
              let albumsSongs = Object.assign({}, state.albums, {})
              albumsSongs[action.artist][idx] = albumSongs
              // console.log(albumsSongs)
              newStateWithSongs = Object.assign({}, state, {albums: albumsSongs})
            }
        }, this);
      }
      if (newStateWithSongs) return newStateWithSongs
      return state
    case 'CLIENT_PROFILE_SELECTED':
      return Object.assign({}, state, {
        selectedProfileIndex: action.index
      })
    case 'CLIENT_PROFILE_CLEAR':
      return Object.assign({}, state, {
        selectedProfileIndex: -1
      })
    default:
      return state
  }
}

export default clients
