import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Task from "@/models/Task"

// PATCH toggle task completion
export async function PATCH(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { completed } = body

    await connectDB()

    const task = await Task.findById(id)

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    task.completed = completed !== undefined ? completed : !task.completed
    await task.save()

    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
