
function profiles(state = [], action) {
  console.log(action)
  switch(action.type){
    case 'PROFILE_ADD':
      return [
        ...state,
        {name: action.name, url: action.url, port: action.port, login: action.login, password: action.password}
      ]
    case 'PROFILE_DELETE':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

export default profiles