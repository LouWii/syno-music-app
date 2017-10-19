import React from 'react';
import '../styles/LoadingOverlay.global.css'

class Popup extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    // Update body class when modal is open
    document.body.classList.toggle('modal-open', this.props.popup.show)
    const display = this.props.popup.show ? 'block' : 'none'
    const className = "modal fade" + (this.props.popup.show ? ' in' : '')
    return (
      <div className={className} role="dialog" style={{display: display}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" aria-label="Close" onClick={this.props.popupHide} >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{this.props.popup.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.popup.content}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Popup