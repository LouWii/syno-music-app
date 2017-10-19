import React from 'react';
import { Link } from 'react-router'
import Profile from './Profile'
import '../styles/ProfilesList.global.css';

class ProfilesList extends React.Component {

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
      <div className="profiles-list container-small">
        <h2>Profiles <Link className="btn btn-default btn-xs" to={'/profiles/add'}>+</Link></h2>
        <div className="profiles row-fluid">
          {this.props.profiles.map((profile, idx) => this.renderProfile(idx, profile))}
        </div>
      </div>
    );
  }
}

ProfilesList.propTypes = {
  profiles: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default ProfilesList;
