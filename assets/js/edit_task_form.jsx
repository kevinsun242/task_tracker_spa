import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export default connect((state) => {return {current_task_edit: state.current_task_edit, users: state.users};})((props) => {
  let task = props.current_task_edit;
  console.log(task);
  return <div className="row">
    <p className="form">
      Title <input className="form-control" id="new-title" type="text" placeholder={task.title} />
      Description<input className="form-control" id="new-description" type="text" placeholder={task.desc}/>
      Assignee
      <select id="assignee">
        {props.users.map((e, key) => {
            return <option key={key} value={e.id}>{e.first_name}</option>;
        })}
     </select>
     Completed<input type="checkbox" value={task.completed}/>
     Duration

    <Link to="/" onClick={() => { api.update_task(task.id);}}
       id="new-description" className="btn btn-primary">
           Update Task
     </Link>
     </p>
  </div>;
});

// export default connect((state) => {return {current_task_edit: state.current_task_edit, users: state.users};})(EditTaskForm);
