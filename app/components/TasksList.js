import React from 'react'
import { Link } from 'react-router'
import TasksListFilters from './TasksListFilters'
import Task from './Task'
import { fileSizeSI } from '../utils/utils'
import '../styles/TasksList.global.css'

class TasksList extends React.Component {
  constructor(props) {
    super(props)
    this.handleShowFiles = this.handleShowFiles.bind(this)
  }

  handleShowFiles(e, idx, task) {
    e.preventDefault()
    const title = 'List of files'
    const content = (<div>
      {
        task.additional.file &&
        <table className="table">
          <tbody>
          {task.additional.file.map((file, idx) => <tr><td>{file.filename}</td><td>{file.priority}</td><td>{fileSizeSI(file.size)}</td></tr>)}
          </tbody>
        </table>
      }
      {!task.additional.file &&
        <p>Files list not available</p>
      }
      </div>)
    this.props.popupShow({title, content})
  }

  render() {
    const listClass = this.props.style === 'table' ? 'table-style' : 'card-style'
    const { statusFilter, searchKeywords} = this.props.filters
    return (
      <div className="tasks-list">
        {
          this.props.tasksLoaded
          &&
          <TasksListFilters filters={this.props.filters} filtersStatusFilter={this.props.filtersStatusFilter} filtersSearch={this.props.filtersSearch} filtersSearchReset={this.props.filtersSearchReset} />
        }
        {
          this.props.tasksLoaded
          &&
          <div className="tasks-list-actions">
            <div className="btn-group" role="group" aria-label="...">
              <Link className="btn btn-primary" to={`/profiles/${this.props.idx}/addTask`}>Add</Link>
            </div>
          </div>
          }
        <div className={'tasks-items ' + listClass} ref="tasks-list">
          {this.props.tasks.filter(
            (task) => ('all'===statusFilter||task.status===statusFilter)
            && (''===searchKeywords||task.title.toLowerCase().includes(searchKeywords.toLowerCase()))
          ).map((task, idx) => <Task key={idx} task={task} idx={idx} style={this.props.style} handleShowFiles={this.handleShowFiles} />)}
        </div>
      </div>
    )
  }
}

TasksList.defaultProps = {
  style: 'card'
};

export default TasksList
