import React from 'react';
import { Link } from 'react-router-dom'
import Profile from './Profile'
import '../styles/ProfilesList.global.scss';

export default class ProfilesList extends React.Component {

  componentDidMount() {
    this.props.clearSelectedClientProfile()
  }

  renderProfile(idx, profile) {
    return (
      <Profile key={idx} idx={idx} profile={profile} deleteProfile={this.props.deleteProfile} />
    )
  }

  render() {
    return (
      <div className="profiles-list">
        <h2>Profiles <Link className="btn btn-add btn-xs" to={'/profiles/add'} title="Add a profile"><i className="glyphicon glyphicon-plus"></i></Link></h2>
        <div className="profiles">
          {this.props.profiles.map((profile, idx) => this.renderProfile(idx, profile))}
          {!this.props.profiles.length &&
            <div className="no-profile">
              <p>Create a new profile to fetch music from your NAS.</p>
              <p><Link className="btn btn-create btn-xs" to={'/profiles/add'}>Create a profile</Link></p>
            </div>
          }
        </div>
      </div>
    );
  }
}

ProfilesList.propTypes = {
  profiles: React.PropTypes.arrayOf(React.PropTypes.object)
}
