
function ui(state={}, action) {
  switch(action.type){
    case 'UI_SHOW_LOADING_OVERLAY':
      return Object.assign({}, state, {
        loadingOverlay: true
      })
    case 'UI_HIDE_LOADING_OVERLAY':
      return Object.assign({}, state, {
        loadingOverlay: false
      })
    default:
      return state
  }
}

export default ui
