// @flow
import React, { Component } from 'react'
import type { Children } from 'react'
import PlayerContainer from './PlayerContainer'

import '../styles/App.global.scss';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div className="main">
        <div className="main-container">
          {this.props.children}
        </div>
        {<PlayerContainer />}
      </div>
    );
  }
}
