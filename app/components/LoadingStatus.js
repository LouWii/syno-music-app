import React from 'react';

import '../styles/LoadingStatus.global.css'

class LoadingStatus extends React.Component {
  render() {
    return (
      <div>{this.props.status !== '' &&
        <div className="loading-info">
          <div className="loading-animation">
            <div className="animation-container">
              <div className="bar bar-one"></div>
              <div className="bar bar-two"></div>
              <div className="bar bar-three"></div>
              <div className="bar bar-four"></div>
              <div className="bar bar-five"></div>
              <div className="bar bar-six"></div>
            </div>
          </div>
          {this.props.status === 'loggingIn' &&
            <p>Connecting to NAS and logging in...</p>
          }
          {this.props.status === 'loadingArtists' &&
            <p>Loading artists...</p>
          }
          {this.props.status === 'loadingAlbums' &&
            <p>Loading albums...</p>
          }
          {this.props.status === 'loadingSongs' &&
            <p>Loading songs...</p>
          }
        </div>
      }</div>
    )
  }
}

export default LoadingStatus