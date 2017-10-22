// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const stateStorageKey = 'syno-music-app'

const router = routerMiddleware(hashHistory);

const enhancer = applyMiddleware(thunk, router);

const defaultState = {
  profiles: [],
  client: {
    clientIsLoading: false,
    selectedProfileIndex: -1,
    autoRefresh: false,
    artists: [],
    albums: {},
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

export default function configureStore(initialState) {
  const storeInitialState = initialState ? initialState : { ...defaultState, profiles: persistedState.profiles }
  return createStore(rootReducer, storeInitialState, enhancer); // eslint-disable-line
}

export const saveState = (state) => {
  try {
    // TODO : Choose what to store in localStorage
    const serializedState = JSON.stringify({profiles: state.profiles})
    localStorage.setItem(stateStorageKey, serializedState)
  } catch (err) {
    // Ignore write errors.
	console.error(err)
  }
}
