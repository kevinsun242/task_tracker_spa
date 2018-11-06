
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import UserList from './user_list';
import TaskList from './task_list';
import AddTaskForm from './add_task_form';

export default function root_init(node) {
  let tasks = window.tasks;
  ReactDOM.render(<Root tasks={tasks} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      session: null,
      users: [],
      add_tasks_forms: new Map(),
    };
    this.fetch_tasks();
    this.fetch_users();
    this.create_session("bob@example.com", "pass1");
  }

  fetch_path(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
    });
  }

  fetch_tasks() {
    this.fetch_path(
      "/api/v1/tasks",
      (resp) => {
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      }
    );
  }

  create_session(email, password) {
  $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({email, password}),
      success: (resp) => {
        let state1 = _.assign({}, this.state, { session: resp.data });
        this.setState(state1);
      }
    });
  }

  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      }
    );
  }

  post(path, req, on_success) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(req),
      success: on_success,
    });

  // create_new_task() {
  //
  // }
  }


  render() {
    return <div>
      <Router>
        <div>
          <Header root={this} />
          <Route path="/" exact={true} render={() =>
            <div>
              <TaskList tasks={this.state.tasks} />
              <h4><Link to={"/add_task_form"}>Add Task</Link></h4>
            </div>
          } />
        <Route path="/add_task_form" exact={true} render={() =>
            <AddTaskForm root={this} tasks={this.state.tasks}/>
        } />
          <Route path="/users" exact={true} render={() =>
            <UserList users={this.state.users} />
          } />
        </div>
      </Router>
    </div>;
  }
}

function Header(props) {
  let {root} = props;
  return <div className="row my-2">
    <div className="col-4">
      <h1><Link to={"/"} onClick={root.fetch_tasks.bind(root)}>Task Tracker</Link></h1>
    </div>
    <div className="col-2">
      <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
    </div>
    <div className="col-6">
      <div className="form-inline my-2">
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button className="btn btn-secondary">Login</button>
      </div>
    </div>
  </div>;
}
