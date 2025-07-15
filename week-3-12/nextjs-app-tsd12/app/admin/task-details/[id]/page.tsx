import { notFound } from "next/navigation";
import { Calendar, Users } from "lucide-react";
import { getTasksById } from "@/services";

export const dynamicParams = true;
export const revalidate = 60; // ISR mỗi 60 giây

type Props = {
  params: { id: string };
};

export default async function TaskDetailISR({ params }: Props) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const task = await getTasksById(id);

  if (!task || !task.id) {
    return notFound();
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-200 max-w-2xl mx-auto mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Task #{task.id}: {task.title}
      </h1>
      <p className="text-gray-600 mb-4">{task.description || "No description."}</p>

      <div className="flex flex-col gap-4 text-sm text-gray-700">
        {task.start_date && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Start Date: {new Date(task.start_date).toLocaleDateString()}
          </div>
        )}
        {task.due_date && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Due Date: {new Date(task.due_date).toLocaleDateString()}
          </div>
        )}
        <div>
          <span className="font-medium">Status:</span>{" "}
          <StatusBadge status={task.status} />
        </div>
        <div>
          <span className="font-medium">Priority:</span>{" "}
          <PriorityBadge priority={task.priority} />
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          Assignee ID: {task.assignee_id || "Unassigned"}
        </div>
      </div>
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
