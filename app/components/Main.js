import React, { Component } from 'react';
import LoadingOverlay from './LoadingOverlay'
import AppBar from './AppBar'
import Popup from './Popup'
import '../styles/Main.global.css';

class Main extends Component {

  render() {
    document.body.classList.toggle('dark-theme', true)
    return (
      <div className="main">
        <AppBar client={this.props.client} profiles={this.props.profiles} />
        <LoadingOverlay {...this.props} />
        <Popup popup={this.props.popup} popupShow={this.props.popupShow} popupHide={this.props.popupHide} />
        <div className="main-container container">
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    )
  }
}

export default Main
