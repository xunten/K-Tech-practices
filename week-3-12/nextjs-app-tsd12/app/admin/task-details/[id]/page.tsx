import { getTasks, getTasksById } from '@/services';
import { Task } from '@/types/type';
import { Calendar, Clock, Flag, User } from 'lucide-react';
import React from 'react';

export const revalidate = 60;
export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
  const data = await getTasks();

  // Có thể là data.tasks hoặc data trực tiếp là mảng
  const tasks = Array.isArray(data.tasks) ? data.tasks : data;

  if (!Array.isArray(tasks)) return [];

  return tasks.slice(0, 20).map((task: Task) => ({
    id: task.id.toString(),
  }));
}

export default async function Index({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const task = await getTasksById(id);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Details</h1>
        </div>
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

        </div>
      </div>
    </div>
  );
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
