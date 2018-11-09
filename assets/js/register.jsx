import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function RegisterForm(props) {
  return <div className="row">
    <div className="form">
      First Name <input className="form-control" id="new-first" type="text"/>
      Last Name<input className="form-control" id="new-last" type="text"/>
    Email <input className="form-control" id="new-email" type="email"/>
     <div>
       Password<input className="form-control" id="new-password" type="password"/>
     </div>
    <Link to="/" onClick={() => { api.create_user()}}
       id="new-description" className="btn btn-primary">
           Register
     </Link>
   </div>
  </div>;
}

export default connect((state) => {return {users: state.users};})(RegisterForm);
