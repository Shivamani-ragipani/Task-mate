import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Task from "@/models/Task"

// GET all tasks
export async function GET() {
  try {
    await connectDB()
    const tasks = await Task.find({}).sort({ createdAt: -1 })
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST create a new task
export async function POST(request) {
  try {
    const body = await request.json()
    const { title, description, dueDate, category } = body

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    await connectDB()

    const task = await Task.create({
      title,
      description,
      dueDate: dueDate || null,
      category: category || "Personal",
      completed: false,
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
