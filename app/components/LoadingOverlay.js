import React from 'react';
import '../styles/LoadingOverlay.global.css'

class LoadingOverlay extends React.Component {

  render() {
    const visibilityClass = this.props.ui.loadingOverlay ? 'running' : 'done'
    return (
      <div className={'loading-overlay '+visibilityClass}>
        <div className="loading-background">
        </div>
        <div className="loading-wrapper">
          <div className="loading-container">
            <h3>Loading</h3>
            <div className="progress">
              <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}>
                <span className="sr-only">100% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoadingOverlay
