import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this task"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    dueDate: {
      type: Date,
      default: null,
    },
    category: {
      type: String,
      enum: ["Personal", "Work", "Study", "Health", "Finance", "Other"],
      default: "Personal",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Check if the model already exists to prevent overwriting
const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema)

export default Task
