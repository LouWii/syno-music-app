// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';


const router = routerMiddleware(hashHistory);

const enhancer = applyMiddleware(thunk, router);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer); // eslint-disable-line
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
