/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import { Switch, Route } from 'react-router'
import App from './containers/App'
import ProfilesPage from './containers/ProfilesPage'
import ProfileAddPage from './containers/ProfileAddPage'
import ASClient from './components/ASClient'
import MusicClientPage from './containers/MusicClientPage'

export default () => (
  <App>
    <Switch>
      <Route path="/profiles/add" component={ProfileAddPage} />
      <Route path="/profiles/:idx" component={MusicClientPage} />
      <Route path="/" component={ProfilesPage} />
    </Switch>
  </App>
);
