import React from 'react';
import { hashHistory } from 'react-router'
import styles from '../styles/TaskAdd.global.css'

class TaskAdd extends React.Component {
  constructor(props) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleCancel(e) {
    this.refs.taskAdd.reset()
    hashHistory.goBack()
  }

  handleAdd(e) {
    e.preventDefault()
    
  }

  render() {
    return (
      <div className="task-add container-small">
        <h2>Add new task</h2>
        <form ref="taskAdd">
          <div className="form-group">
            <label htmlFor="uri">URL/Magnet link</label>
            <input ref="uri" type="text" className="form-control" id="uri" />
          </div>
          <p><strong>OR</strong></p>
          <div className="form-group">
            <label htmlFor="file">Torrent File</label>
            <input ref="file" type="file" id="file" />
          </div>
          <hr/>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input ref="destination" type="text" className="form-control" id="destination" />
          </div>
          <hr/>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input ref="username" type="text" className="form-control" id="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input ref="password" type="text" className="form-control" id="password" />
          </div>
          <hr/>
          <div className="form-group">
            <label htmlFor="unzip_password">Unzip Password</label>
            <input ref="unzip_password" type="text" className="form-control" id="unzip_password" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.handleAdd}>Add</button>&nbsp;
          <button type="button" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}

TaskAdd.propTypes = {

}

export default TaskAdd;
