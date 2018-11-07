import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
  Application state layout
  {
    tasks: props.tasks, // List of Tasks
    session: null,
    users: [], // List of Users
    adding-task: false
  }
*/
function tasks(state = [], action) {
  switch (action.type) {
  case 'TASK_LIST':
    return action.data;
  case 'TASK_CREATE':
    return state;
  case 'TASK_UPDATE':
    return state;
  case 'TASK_DELETE':
    return _.filter(state, (task) => task.id != action.task_id);
  default:
    return state;
  }
}

function current_task_edit(state=new Map(), action) {
  switch(action.type) {
    case 'TASK_GET':
      return action.data;
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USER_LIST':
    return action.data;
  default:
    return state;
  }
}

function session(state = null, action) {
  switch (action.type) {
  case 'NEW_SESSION':
    return action.data;
  default:
    return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({tasks, users, session, current_task_edit});
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
