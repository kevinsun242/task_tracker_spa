import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import api from './api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function TaskList(props) {
  var display;
  if (props.session) {
    let tasks = _.map(props.tasks, (t) => <Task key={t.id} task={t} session={props.session} />);
    display =
    (<div className="col-12">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Duration</th>
            <th>Assignee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks}
        </tbody>
      </table>
      <h4><Link to={"/add_task_form"}>Add Task</Link></h4>
    </div>)
  }
  else {
    display = (<div></div>)
  }
  return <div className="row">
      {display}
  </div>;
}


function Task(props) {
  let {task} = props;
  return <tr>
    <td>{task.title}</td>
    <td>{task.desc}</td>
    <td>{task.completed ? "yes" : "no"}</td>
    <td>{task.duration}</td>
    <td>{task.user_id}</td>
    <td>
      <Link className="btn btn-primary" to={"/edit_task_form/"+task.id} onClick={()=> {api.get_task(task.id, props.session.token)}}>Edit</Link>
      <button className="btn btn-danger" onClick={() => { api.delete_task(task.id, props.session.token)}}> Delete</button>
    </td>
  </tr>;
}

export default connect((state) => {return {tasks: state.tasks, session: state.session};})(TaskList);
