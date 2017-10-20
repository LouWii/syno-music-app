import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore, { saveState } from './store/configureStore';
import App from './components/App';
import ProfilesList from './components/ProfilesList'
import ProfileAdd from './components/ProfileAdd'
import ASClient from './components/ASClient'

import './styles/app.global.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

store.subscribe(() => {
  saveState(store.getState())
});

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={ProfilesList}></IndexRoute>
        <Route path="/profiles/add" component={ProfileAdd}></Route>
        <Route path="/profiles/:idx" component={ASClient}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
