import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Task from "@/models/Task"

// GET a single task
export async function GET(request, { params }) {
  try {
    const { id } = params
    await connectDB()

    const task = await Task.findById(id)

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

//update a task
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    await connectDB()

    const updatedTask = await Task.findByIdAndUpdate(id, { ...body }, { new: true, runValidators: true })

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(updatedTask)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE a task
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    await connectDB()

    const deletedTask = await Task.findByIdAndDelete(id)

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
