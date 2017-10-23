
function popup(state = [], action) {
  switch(action.type){
    case 'POPUP_SHOW':
      return Object.assign({}, state, {
        show: true,
        ...action.popupOptions
      })
    case 'POPUP_HIDE':
      return Object.assign({}, state, {
        show: false
      })
    default:
      return state
  }
}

export default popup