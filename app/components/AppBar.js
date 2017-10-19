import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import '../styles/AppBar.global.css';

class AppBar extends Component {

  handleBack() {
    hashHistory.goBack()
  }

  render() {
    const {profiles, client} = this.props
    let currentProfile = ''
    if (this.props.client.selectedProfileIndex >= 0) {
      currentProfile = profiles[this.props.client.selectedProfileIndex].name
    }
    return (
      <div className="app-bar">
        <span className={"app-bar-back " + (currentProfile !== ''?'display':'')}><button onClick={this.handleBack}><span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button></span>
        <span className="app-name">Syno Music App</span>
        {currentProfile !== '' &&
          <span className="profile-name"><span className="glyphicon glyphicon-server" aria-hidden="true"></span> {currentProfile}</span>
        }
      </div>
    )
  }
}

export default AppBar