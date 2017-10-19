import React, { Component } from 'react';
import { Link } from 'react-router';
import '../styles/Profile.global.css';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    this.props.deleteProfile(this.props.idx)
  }

  render() {
    return (
      <div className="profile">
        <header>{this.props.profile.name}</header>
        <div className="content">
          <p><strong>URL</strong> {this.props.profile.url}</p>
          <p><strong>Login</strong> {this.props.profile.login}</p>
        </div>
        <div className="actions">
          <Link className="btn btn-primary btn-sm" to={`/profiles/${this.props.idx}`}>Connect</Link>
          <button type="button" className="btn btn-danger btn-xs" onClick={this.handleDelete}>X</button>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  idx: React.PropTypes.number.isRequired,
  profile: React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string,
    login: React.PropTypes.string,
    password: React.PropTypes.string,
  }),
}

export default Profile
