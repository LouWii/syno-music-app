import React from 'react';
import { capitalize, statusToIcon } from '../utils/utils'
import '../styles/TasksListFilters.global.css'

class TasksListFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = { activeFilter: 'all', searchKeywords: this.props.filters.searchKeywords }
    this.handleStatusFilter = this.handleStatusFilter.bind(this)
    this.renderButton = this.renderButton.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchReset = this.handleSearchReset.bind(this)
  }

  renderButton() {
    return Object.keys(statusToIcon)
      .map((e) => <button key={e} type="button" title={capitalize(e.replace('_', ' '))} data-status={e} className={"btn btn-"+((e===this.props.filters.statusFilter)?"primary":"default")} onClick={this.handleStatusFilter}><span className={statusToIcon[e]} ></span></button>);
  }

  handleStatusFilter(e) {
    e.preventDefault()
    this.props.filtersStatusFilter(e.currentTarget.dataset.status)
  }

  handleSearchChange(e) {
    e.preventDefault()
    this.props.filtersSearch(e.currentTarget.value)
    this.setState({searchKeywords: e.currentTarget.value})
  }

  handleSearchReset(e) {
    e.preventDefault()
    this.props.filtersSearchReset()
    this.setState({searchKeywords: ''})
  }

  render() {
    return (
      <div className="tasks-list-filters">
        <div className="tasks-list-filter">
          <div className="btn-group" role="group" aria-label="...">
            <button type="button" data-status="all" className={"btn btn-"+(('all'===this.props.filters.statusFilter)?"primary":"default")} onClick={this.handleStatusFilter}>All</button>
            {this.renderButton()}
          </div>
        </div>
        <div className="tasks-list-search">
          <div className="form-group has-feedback">
            <input type="text" className="form-control" id="inputSuccess3" placeholder="Search..." onChange={this.handleSearchChange} value={this.state.searchKeywords} />
            <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" onClick={this.handleSearchReset}></span>
            <span id="inputSuccess3Status" className="sr-only">(success)</span>
          </div>
        </div>
      </div>
    )
  }
}

export default TasksListFilters
