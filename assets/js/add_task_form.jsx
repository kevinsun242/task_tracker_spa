import React from 'react';
import _ from 'lodash';
import api from './api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export default function AddTaskForm(props) {
  return <div className="row">
    <p className="form">
       Title <input className="form-control" id="new-title" type="text" />
     Description<input className="form-control" id="new-description" type="text"/>
   <Link to="/" onClick={() => { api.add_task(); api.fetch_tasks();}}
     id="new-description" className="btn btn-primary">
         Create Task
    </Link>
     </p>
  </div>;
}
