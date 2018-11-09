import React from 'react';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';

// handles the login of an existing user
function login_existing() {
  let email = $("#email").val();
  let password = $("#password").val();
  api.create_session(email, password);
}

function Header(props) {
  var formline;
  if (props.session) {
    formline = (<div>
                  <p>Welcome {props.session.user_email} |</p>
                  <button onClick={() => api.logout()} className="btn btn-danger"> Logout
                  </button>
                </div>
               )
  }
  else {
    formline = (
          <div className="form-inline my-2">
            <input type="email" placeholder="email" id="email"/>
            <input type="password" placeholder="password" id="password" />
            <button className="btn btn-primary" onClick={login_existing}>Login</button>
            <Link className="btn btn-secondary" to="/register" >Register</Link>
          </div>)
  }
  return <div className="row my-2">
    <div className="col-4">
      <h1><Link to={"/"} onClick={() => api.fetch_tasks()}>Task Tracker</Link></h1>
    </div>
    <div className="col-2">
      <p><Link to={"/users"} onClick={() => api.fetch_users()}>Users</Link></p>
    </div>
    <div className="col-6">
      {formline}
    </div>
  </div>;
}

export default connect((state) => {return {session: state.session};})(Header);
