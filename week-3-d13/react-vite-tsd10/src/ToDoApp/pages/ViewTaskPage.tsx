import React, { useEffect } from "react"
import { deleteTask, getTaskById } from "../services"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Calendar, User, Flag, Clock, Trash2 } from "lucide-react"
import { useAuthStore } from "../auth/useAuthStore"
import { toast } from "react-toastify"
import ButtonWithPermissions from "../components/ButtonWithPermissions"

export default function ViewTaskPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const access_token = useAuthStore((state) => state.access_token);

  type Task = {
    id: number
    title: string
    description: string
    status: string
    priority: string
    start_date?: string
    due_date?: string
    assignee_id?: string | number
  }

  const [task, setTask] = React.useState<Task | null>(null)

  useEffect(() => {
    if (!access_token) {
      navigate('/');
      return;
    }
    const fetchTask = async () => {
      try {
        if (!id) return;
        const result = await getTaskById(Number(id), access_token);
        if (!result || !result.id) {
          throw new Error('Task not found or invalid');
        }
        setTask(result)
      } catch (error) {
        console.error("Error fetching task:", error)
        alert('Không thể lấy thông tin task.');
      }
    }

    fetchTask()
  }, [id, access_token, navigate])

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading task details...</p>
        </div>
      </div>
    )
  }

  const handleOnEdit = (taskId: number) => {
    // Logic to handle task edit
    navigate(`/update-task/${taskId}`);
  };

  const handleOnDelete = async () => {
    if (!task || !task.id || !access_token) {
      toast.error("Invalid task data or unauthenticated.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    try {
      await deleteTask(task.id.toString(), access_token);
      toast.success("Delete task successfully!");
      navigate("/tasks");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Delete task failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/tasks")}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Tasks
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Task Details</h1>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Task Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{task.title}</h2>
                <div className="flex flex-wrap gap-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    {task.status}
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(task.priority)}`}
                  >
                    <Flag className="h-4 w-4 mr-1" />
                    {task.priority} Priority
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Description */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{task.description || "No description provided."}</p>
                </div>
              </div>

              {/* Dates */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Start Date</p>
                      <p className="text-gray-900">
                        {task.start_date
                          ? new Date(task.start_date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                          : "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Due Date</p>
                      <p className="text-gray-900">
                        {task.due_date
                          ? new Date(task.due_date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                          : "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignment */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment</h3>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Assignee</p>
                    <p className="text-gray-900">{task.assignee_id ? `User ID: ${task.assignee_id}` : "Unassigned"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={() => navigate("/tasks")}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Tasks
              </button>
              <button
                onClick={() => {
                  if (typeof task.id === "number") handleOnEdit(task.id);
                }}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Edit Task
              </button>
              <ButtonWithPermissions permissions={["Customer"]}
                onClick={() => handleOnDelete()}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Delete Task
              </ButtonWithPermissions>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "in progress":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}