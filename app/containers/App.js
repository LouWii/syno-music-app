// @flow
import React, { Component } from 'react'
import type { Children } from 'react'
import PlayerContainer from './PlayerContainer'

import '../styles/Main.global.css';

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
