import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function AddTaskForm(props) {
  return <div className="row">
    <p className="form">
       Title <input className="form-control" id="new-title" type="text" />
       Description<input className="form-control" id="new-description" type="text"/>
       Assignee
     <select id="assignee">
         {props.users.map((e, key) => {
             return <option key={key} value={e.id}>{e.first_name}</option>;
         })}
      </select>

   <Link to="/" onClick={() => { api.add_task(); api.fetch_tasks();}}
     id="new-description" className="btn btn-primary">
         Create Task
    </Link>
     </p>
  </div>;
}

export default connect((state) => {return {users: state.users};})(AddTaskForm);
