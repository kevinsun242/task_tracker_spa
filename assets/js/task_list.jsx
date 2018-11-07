import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';


function TaskList(props) {
  let tasks = _.map(props.tasks, (t) => <Task key={t.id} task={t} />);
  return <div className="row">
    <div className="col-12">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks}
        </tbody>
      </table>
    </div>
  </div>;
}


function Task(props) {
  let {task} = props;
  return <tr>
    <td>{task.title}</td>
    <td>{task.desc}</td>
    <td>{task.completed ? "yes" : "no"}</td>
    <td></td>
    <td>
      <button>Edit</button>
      <button>Delete</button>
       </td>
  </tr>;
}

export default connect((state) => {return {tasks: state.tasks};})(TaskList);
