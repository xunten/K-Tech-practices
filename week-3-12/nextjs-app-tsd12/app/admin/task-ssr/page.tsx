import Link from 'next/link';
import React from 'react';

import { Task } from '@/types/type';
import { getTasks } from '@/services';
import { Calendar, Eye, Users } from 'lucide-react';

// Server-side rendering to fetch products
// This function will run on the server and fetch data before rendering the page
export const dynamic = 'force-dynamic';

export default async function Index() {

  const data = await getTasks();
  const tasks = Array.isArray(data.tasks) ? data.tasks : data;

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <Tasks tasks={tasks} />
    </div>
  );
}

function Tasks({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>Tasks SSR</h1>
      <hr className='mb-4 border-gray-200 border-t' />


      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Details</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task: Task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      #{task.id} - {task.title}
                    </div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">{task.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    {task.start_date && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        Start: {new Date(task.start_date).toLocaleDateString()}
                      </div>
                    )}
                    {task.due_date && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={task.status} />
                </td>
                <td className="px-6 py-4">
                  <PriorityBadge priority={task.priority} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {task.assignee_id ? task.assignee_id.toString().slice(-2) : "NA"}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">ID: {task.assignee_id || "Unassigned"}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Link href={`/admin/task-details/${task.id}`}
                    className="text-blue-500 hover:text-blue-700">
                    <button
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500">Try adjusting your filters or create a new task.</p>
        </div>
      )}

      {/* <ul>
        {tasks.map((task) => (
          <li key={task.id} className='border-b border-gray-200 py-2 text-gray-800'>
            <Link href={`/admin/task-details/${task.id}`} className='text-blue-600 hover:underline'>
              {task.title}
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "in-progress": case "in progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending": return "bg-amber-100 text-amber-800 border-amber-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>{status}</span>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-red-50 text-red-700 border-red-200";
      case "medium": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(priority)}`}>{priority}</span>;
}
