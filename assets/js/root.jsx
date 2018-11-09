
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import api from './api';
import UserList from './user_list';
import TaskList from './task_list';
import AddTaskForm from './add_task_form';
import EditTaskForm from './edit_task_form';
import Header from './header';
import RegisterForm from './register'

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={window.tasks} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    api.fetch_tasks();
    api.fetch_users();
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <Route path="/" exact={true} render={() =>
            <div>
              <TaskList />
              <h4><Link to={"/add_task_form"}>Add Task</Link></h4>
            </div>
          } />
          <Route path="/add_task_form" exact={true} render={() =>
              <AddTaskForm />
          } />
        <Route path="/register" exact={true} render={() =>
              <RegisterForm />
          } />
        <Route path="/edit_task_form/:id" exact={true} render={() =>
              <EditTaskForm />
          } />
          <Route path="/users" exact={true} render={() =>
            <UserList />
          } />
        </div>
      </Router>
    </div>;
  }
}
