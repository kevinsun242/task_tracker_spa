import store from './store';

class TheServer {
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
        store.dispatch({
          type: 'TASK_LIST',
          data: resp.data,
        });
      }
    );
  }

  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        });
      }
    );
  }

  send_post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  create_session(email, password) {
    this.send_post(
      "/api/v1/sessions",
      {email, password},
      (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      }
    );
  }

  logout() {
    store.dispatch({
      type: 'DELETE_SESSION',
    });
  }

  create_user() {
    let first_name = $("#new-first").val();
    let last_name = $("#new-last").val();
    let email = $("#new-email").val();
    let password = $("#new-password").val();
    let text =  JSON.stringify({
        user: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password_hash: password,
        },
      });
    $.ajax("/api/v1/users", {
      type: "POST",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: text,
      success: (resp) => {
        store.dispatch({
          type: 'USER_CREATE',
          data: resp.data,
        });
        this.create_session(email, password)
      },
    });
  }

  add_task() {
    let title = $("#new-title").val();
    let description = $("#new-description").val();
    let assignee = $("#assignee").val();
    let text =  JSON.stringify({
        task: {
          title: title,
          desc: description,
          user_id: assignee,
        },
      });
    $.ajax("/api/v1/tasks", {
      type: "POST",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: text,
      success: (resp) => {
        store.dispatch({
          type: 'TASK_CREATE',
          data: resp.data,
        });
      },
    });
  }

  delete_task(task_id) {
    $.ajax('/api/v1/tasks/' + task_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'TASK_DELETE',
          task_id: task_id,
        });
      }
    });
  }

  update_task(task_id) {
    if ($("#new-title").val() == '') {
      var title = $("new-title").attr('placeholder');
    }
    else {
      title = $("#new-title").val();
    }

    if ($("#new-description").val() == '') {
      var description = $("new-description").attr('placeholder');
    }
    else {
      description = $("#new-description").val();
    }
    let assignee = $("#assignee").val();
    let completed = $("#completed").is(":checked");
    let duration = $("#duration").val();
    var minutes = duration % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var hours = Math.floor(duration / 60);
    hours = hours < 10 ? '0' + hours : hours;
    let time = hours + ":" + minutes +":00";
    console.log(time);

    let text =  JSON.stringify({
      task: {
        title: title,
        desc: description,
        user_id: assignee,
        completed: completed,
        duration: time,
      },
    });
    $.ajax('/api/v1/tasks/' + task_id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: text,
      success: (resp) => {
        store.dispatch({
          type: 'TASK_UPDATE',
          task_id: task_id,
        });
        this.fetch_tasks();
      }
    });
  }

  get_task(task_id) {
    this.fetch_path(
      "/api/v1/tasks/" + task_id,
      (resp) => {
        store.dispatch({
          type: 'TASK_GET',
          data: resp.data,
        });
      }
    );
  }
}


export default new TheServer();
