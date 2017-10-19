import React from 'react';
import { hashHistory } from 'react-router'
import styles from '../styles/ProfileAdd.global.css'

class ProfileAdd extends React.Component {
  constructor(props) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleCancel(e) {
    this.refs.profileAdd.reset()
    hashHistory.goBack()
  }

  handleSave(e) {
    e.preventDefault()
    this.props.addProfile(this.refs.profileName.value, this.refs.profileUrl.value, this.refs.profilePort.value, this.refs.profileLogin.value, this.refs.profilePassword.value)
    hashHistory.push('/')
  }

  render() {
    return (
      <div className="profile-add container-small">
        <h2>Create new profile</h2>
        <form ref="profileAdd">
          <div className="form-group">
            <label htmlFor="profileName">Profile Name</label>
            <input ref="profileName" type="text" className="form-control" id="profileName" placeholder="My beloved syno nas" />
          </div>
          <div className="form-group">
            <label htmlFor="profileUrl">URL / IP</label>
            <input ref="profileUrl" type="text" className="form-control" id="profileUrl" placeholder="http://192.168.1.100" />
          </div>
          <div className="form-group">
            <label htmlFor="profilePort">Port (optionnal, default 5000)</label>
            <input ref="profilePort" type="text" className="form-control" id="profilePort" placeholder="5000" />
          </div>
          <div className="form-group">
            <label htmlFor="profileLogin">Login</label>
            <input ref="profileLogin" type="text" className="form-control" id="profileLogin" placeholder="john" />
          </div>
          <div className="form-group">
            <label htmlFor="profilePassword">Password</label>
            <input ref="profilePassword" type="password" className="form-control" id="profilePassword" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.handleSave}>Save</button>&nbsp;
          <button type="button" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}

ProfileAdd.propTypes = {

}

export default ProfileAdd;
