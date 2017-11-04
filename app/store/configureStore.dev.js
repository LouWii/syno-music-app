import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware, routerActions } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import * as appActions from '../actions/actionCreators'
import { stateStorageKey } from '../utils/localStorage'

const history = createHashHistory();

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

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });
  middleware.push(logger);

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...appActions,
    ...routerActions,
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const storeInitialState = initialState ? initialState : { ...defaultState, profiles: persistedState.profiles }
  const store = createStore(rootReducer, storeInitialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
};

export default { configureStore, history };
