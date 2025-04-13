"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import TaskForm from "@/components/TaskForm"
import TaskList from "@/components/TaskList"
import SearchFilter from "@/components/SearchFilter"
import "@/app/globals.css"

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editTask, setEditTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  // Fetch tasks from API
  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/tasks")
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // Add new task
  const handleAddTask = async (task) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })

      if (response.ok) {
        fetchTasks()
      }
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  // Update task
  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      })

      if (response.ok) {
        setEditTask(null)
        fetchTasks()
      }
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchTasks()
      }
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  // Toggle task completion
  const handleToggleComplete = async (id, completed) => {
    try {
      const response = await fetch(`/api/tasks/${id}/toggle`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      })

      if (response.ok) {
        fetchTasks()
      }
    } catch (error) {
      console.error("Error toggling task completion:", error)
    }
  }

  // Filter tasks based on search term and category
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "" || task.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <main className="container">
      <Header />
      <div className="app-container">
        <TaskForm
          onAddTask={handleAddTask}
          editTask={editTask}
          onUpdateTask={handleUpdateTask}
          setEditTask={setEditTask}
        />
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
        <TaskList
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          onEditTask={setEditTask}
          isLoading={isLoading}
        />
      </div>
    </main>
  )
}
