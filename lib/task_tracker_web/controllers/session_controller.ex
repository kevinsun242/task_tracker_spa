defmodule TaskTrackerWeb.SessionController do
  use TaskTrackerWeb, :controller
   action_fallback TaskTrackerWeb.FallbackController
   alias TaskTracker.Users.User
   def create(conn, %{"email" => email, "password" => password}) do
      with %User{} = user <- TaskTracker.Users.get_and_auth_user(email, password) do
        resp = %{
          data: %{
            token: Phoenix.Token.sign(TaskTrackerWeb.Endpoint, "user_id", user.id),
            user_id: user.id,
            user_email: user.email,
          }
        }
         conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:created, Jason.encode!(resp))
      end
    end
end
