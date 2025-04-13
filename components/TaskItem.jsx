"use client"

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "No due date"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className="task-category">{task.category}</span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-meta">
        <div className="task-due-date">
          <span>Due: {formatDate(task.dueDate)}</span>
        </div>

        <div className="task-actions">
          <button
            className={`action-btn ${task.completed ? "incomplete-btn" : "complete-btn"}`}
            onClick={() => onToggleComplete(task._id, task.completed)}
            title={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {task.completed ? "✓" : "○"}
          </button>

          <button className="action-btn edit-btn" onClick={() => onEdit(task)} title="Edit task">
            ✎
          </button>

          <button className="action-btn delete-btn" onClick={() => onDelete(task._id)} title="Delete task">
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
