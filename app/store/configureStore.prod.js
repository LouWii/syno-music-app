// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const stateStorageKey = 'syno-music-app'

const defaultState = {
  profiles: [],
  client: {
    clientIsLoading: false,
    selectedProfileIndex: -1,
    autoRefresh: false,
    artists: [],
    albums: {},
    loadingStatus: ''
  },
  player: {
    songs: [],
    status: 'stop',
    muted: false,
    currentPlaylistId: '',
    currentSongIdx: null,
    currentSongId: null
  },
  ui: {
    loadingOverlay: false,
  },
  popup: {
    title: '',
    content: '',
    show: false
  }
}

const persistedState = localStorage.getItem(stateStorageKey) ? JSON.parse(localStorage.getItem(stateStorageKey)) : defaultState

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState) {
  const storeInitialState = initialState ? initialState : { ...defaultState, profiles: persistedState.profiles }
  return createStore(rootReducer, storeInitialState, enhancer);
}

export default { configureStore, history };
