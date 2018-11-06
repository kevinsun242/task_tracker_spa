import React from 'react';
import _ from 'lodash';


export default function AddTaskForm(props) {

  return <div className="row">
    <p className="form">
       Title <input className="form-control" type="text" />
       Description<input className="form-control" type="text"/>
       <button className="btn btn-primary">
         Create Task
       </button>
     </p>
  </div>;
}
