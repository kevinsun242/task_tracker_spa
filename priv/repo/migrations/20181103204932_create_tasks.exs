defmodule TaskTracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, null: false
      add :desc, :text, null: false
      add :completed, :boolean, default: false, null: false
      add :duration, :time
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:tasks, [:title], unique: true)
    create index(:tasks, [:user_id])
  end
end
