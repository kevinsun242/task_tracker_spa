import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export default connect((state) => {return {current_task_edit: state.current_task_edit, users: state.users, session: state.session};})((props) => {
  let task = props.current_task_edit;
  return <div className="row">
    <div className="form">
      Title <input className="form-control" id="new-title" type="text" placeholder={task.title} />
      Description<input className="form-control" id="new-description" type="text" placeholder={task.desc}/>
      Assignee
      <select id="assignee">
        {props.users.map((e, key) => {
            return <option key={key} value={e.id}>{e.first_name}</option>;
        })}
     </select>

     <div>
       Completed<input id="completed" type="checkbox" value={task.completed}/>
     </div>
     <div>
       Duration <input id="duration" type="number" min="0" step="15"/> minutes

     </div>
    <Link to="/" onClick={() => { api.update_task(task.id, props.session.token);}}
       id="new-description" className="btn btn-primary">
           Update Task
     </Link>
   </div>
  </div>;
});
