function player(state = [], action) {
  switch(action.type){
    case 'PLAY_PAUSE_PLAYER':
      if (state.status === 'play') {
        return Object.assign({}, state, {status: 'pause'})
      } else {
        return Object.assign({}, state, {status: 'play'})
      }
    case 'UPDATE_PLAYER_SONGS':
      return Object.assign({}, state, {songs: action.songs, currentPlaylistId: action.currentPlaylistId})
    case 'PLAYER_NEXT':
      if (state.currentSongIdx < (state.songs.length-1)) {
        return state
      } else {
        return Object.assign({}, state, {currentSongIdx: state.currentSongIdx+1})
      }
    case 'PLAYER_PREVIOUS':
      if (state.currentSongIdx > 0) {
        return state
      } else {
        return Object.assign({}, state, {currentSongIdx: state.currentSongIdx-1})
      }
    case 'PLAYER_SET_SONG':
      if (action.songIdx >= 0 && action.songIdx <= (state.songs.length-1)) {
        return Object.assign({}, state, {currentSongIdx: action.songIdx})
      } else {
        return state
      }
    default:
      return state
  }
}

export default player