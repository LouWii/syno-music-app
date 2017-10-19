import React from 'react';
import { capitalize, statusToIcon } from '../utils/utils'
// import '../styles/StatusIcon.global.css'

class StatusIcon extends React.Component {

  render() {
    let iconClass = 'status-icon '
    if (statusToIcon[this.props.status]) {
      iconClass += statusToIcon[this.props.status]
    } else {
      iconClass += statusToIcon['other']
    }
    return (
      <span className={iconClass} title={capitalize(this.props.status.replace('_', ' '))} aria-hidden="true"></span>
    )
  }
}

StatusIcon.propTypes = {
  status: React.PropTypes.string.isRequired
}

export default StatusIcon
