"use client"

import { useState, useEffect } from "react"

const TaskForm = ({ onAddTask, editTask, onUpdateTask, setEditTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "Personal",
  })

  // If editTask is provided, populate the form
  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description,
        dueDate: editTask.dueDate ? new Date(editTask.dueDate).toISOString().split("T")[0] : "",
        category: editTask.category,
      })
    }
  }, [editTask])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.title.trim()) {
      alert("Please enter a task title")
      return
    }

    if (editTask) {
      onUpdateTask(editTask._id, formData)
    } else {
      onAddTask(formData)
    }

    // Reset form
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      category: "Personal",
    })
  }

  const handleCancel = () => {
    setEditTask(null)
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      category: "Personal",
    })
  }

  return (
    <div className="task-form">
      <h2 className="form-title">{editTask ? "Edit Task" : "Add New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="form-control"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editTask ? "Update Task" : "Add Task"}
          </button>
          {editTask && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TaskForm
