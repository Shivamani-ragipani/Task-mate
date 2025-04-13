import TaskItem from "./TaskItem"

const TaskList = ({ tasks, onDeleteTask, onToggleComplete, onEditTask, isLoading }) => {
  if (isLoading) {
    return <div className="loading">Loading tasks...</div>
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks found</h3>
        <p>Add a new task or adjust your search filters</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDeleteTask}
          onToggleComplete={onToggleComplete}
          onEdit={onEditTask}
        />
      ))}
    </div>
  )
}

export default TaskList
