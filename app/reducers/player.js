function player(state = [], action) {
  switch(action.type){
    case 'PLAY_PAUSE_PLAYER':
      if (state.status === 'play') {
        return Object.assign({}, state, {status: 'pause'})
      } else {
        return Object.assign({}, state, {status: 'play'})
      }
    case 'PLAYER_PLAY':
      return Object.assign({}, state, {status: 'play'})
    case 'PLAYER_PAUSE':
      return Object.assign({}, state, {status: 'pause'})
    case 'UPDATE_PLAYER_SONGS':
      return Object.assign({}, state, {songs: action.songs, currentPlaylistId: action.currentPlaylistId})
    case 'PLAYER_NEXT':
      if (state.currentSongIdx < (state.songs.length-1)) {
        const currentSongId = state.songs[state.currentSongIdx+1].id
        return Object.assign({}, state, {currentSongIdx: state.currentSongIdx+1, currentSongId})
      } else {
        return state
      }
    case 'PLAYER_PREVIOUS':
      if (state.currentSongIdx > 0) {
        const currentSongId = state.songs[state.currentSongIdx-1].id
        return Object.assign({}, state, {currentSongIdx: state.currentSongIdx-1, currentSongId})
      } else {
        return state
      }
    case 'PLAYER_SET_SONG':
      if (action.songIdx >= 0 && action.songIdx <= (state.songs.length-1)) {
        const currentSongId = state.songs[action.songIdx].id
        return Object.assign({}, state, {currentSongIdx: action.songIdx, currentSongId})
      } else {
        return state
      }
    case 'PLAYER_MUTE_UNMUTE':
      return Object.assign({}, state, {muted: !state.muted})
    default:
      return state
  }
}

export default player