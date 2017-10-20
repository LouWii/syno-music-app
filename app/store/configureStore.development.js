import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const stateStorageKey = 'syno-down-app'

const actionCreators = {

  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://extension.remotedev.io/docs/API/Arguments.html
    actionCreators,
  }) :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger)
);

const defaultState = {
  profiles: [],
  client: {
    clientIsLoading: false,
    selectedProfileIndex: -1,
    autoRefresh: false,
    tasksLoaded: false,
    tasks: [],
    artists: [],
    albums: {},
    filters: {
      statusFilter: "all",
      searchKeywords: ''
    }
  },
  player: {
    songs: [],
    status: 'stop',
    currentPlaylistId: '',
    currentSongIdx: null
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
  const store = createStore(rootReducer, storeInitialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}

export const saveState = (state) => {
  try {
    // TODO : Choose what to store in localStorage
    const serializedState = JSON.stringify({ profiles: state.profiles })
    localStorage.setItem(stateStorageKey, serializedState)
  } catch (err) {
    // Ignore write errors.
    console.error(err)
  }
}
