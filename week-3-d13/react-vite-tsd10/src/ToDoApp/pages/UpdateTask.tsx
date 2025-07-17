import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskById, updateTask } from "../services";
import type { Task } from "../types/type";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../auth/useAuthStore";

interface TaskFormData {
  title: string;
  start_date: string;
  due_date?: string;
  description?: string;
  status: 'to_do' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee_id?: number;
}

const validationSchema: yup.ObjectSchema<TaskFormData> = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  start_date: yup
    .string()
    .required('Start date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date'),
  due_date: yup
    .string()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date')
    .test('due_date-after-start_date', 'Due date must be after start date', function (value) {
      if (!value) return true;
      const { start_date } = this.parent;
      return new Date(value) >= new Date(start_date);
    }),
  description: yup.string().optional().max(500, 'Description must be less than 500 characters'),
  status: yup
    .mixed<'to_do' | 'in_progress' | 'done'>()
    .required('Status is required')
    .oneOf(['to_do', 'in_progress', 'done'], 'Please select a valid status'),
  priority: yup
    .mixed<'low' | 'medium' | 'high'>()
    .required('Priority is required')
    .oneOf(['low', 'medium', 'high'], 'Please select a valid priority'),
  assignee_id: yup.number().optional().min(1, 'Assignee ID cannot be empty if provided'),
});

export default function UpdateTaskPage() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = React.useState<Task | null>(null);

  const access_token = useAuthStore((state) => state.access_token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
    reset,
  } = useForm<TaskFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (!access_token) {
      navigate('/login');
      return;
    }

    const fetchTask = async () => {
      if (id !== undefined) {
        try {
          const data = await getTaskById(Number(id), access_token);
          if (!data) throw new Error('Task not found');

          reset({
            title: data.title || '',
            start_date: data.start_date ? new Date(data.start_date).toISOString().split('T')[0] : '',
            due_date: data.due_date ? new Date(data.due_date).toISOString().split('T')[0] : '',
            description: data.description || '',
            status: data.status,
            priority: data.priority,
            assignee_id: data.assignee_id ?? '',
          });

          setTask(data);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      }
    };

    fetchTask();
  }, [id, reset, access_token, navigate]);

  const onSubmit = async (data: TaskFormData): Promise<void> => {
    try {
      if (!task || !task.id || !task.created_time || !access_token) {
        throw new Error('Invalid task data or unauthenticated.');
      }

      const updatedTask: Task = {
        ...task,
        title: data.title,
        start_date: new Date(data.start_date),
        due_date: data.due_date ? new Date(data.due_date) : undefined,
        description: data.description || undefined,
        status: data.status,
        priority: data.priority,
        assignee_id: data.assignee_id ? Number(data.assignee_id) : undefined,
        completed_date: data.status === 'done' ? new Date() : undefined,
        updated_time: new Date(),
      };

      // ✅ Truyền token vào
      await updateTask(updatedTask, access_token);

      toast.success('Task updated successfully!');
      navigate('/tasks');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Update Task</h2>
            <p className="mt-2 text-blue-100">Fill in the details to update task</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                {...register('title')}
                className={`w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-slate-400 ${errors.title
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : !errors.title && dirtyFields.title
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                placeholder="Enter task title..."
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Date Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="start_date" className="block text-sm font-semibold text-slate-700">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start_date"
                  {...register('start_date')}
                  className={`w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${errors.title
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : !errors.start_date && dirtyFields.start_date
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                />
                {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="due_date" className="block text-sm font-semibold text-slate-700">
                  Due Date
                </label>
                <input
                  type="date"
                  id="due_date"
                  {...register('due_date')}
                  className={`w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${errors.title
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : !errors.due_date && dirtyFields.due_date
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                />
                {errors.due_date && <p className="text-red-500 text-sm mt-1">{errors.due_date.message}</p>}
              </div>
            </div>

            {/* Status & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-semibold text-slate-700">
                  Status
                </label>
                <select
                  id="status"
                  {...register('status')}
                  className={`w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white ${errors.status
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : !errors.status && dirtyFields.status
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                >
                  <option value="to_do">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="priority" className="block text-sm font-semibold text-slate-700">
                  Priority
                </label>
                <select
                  id="priority"
                  {...register('priority')}
                  className={`w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white ${errors.status
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : !errors.priority && dirtyFields.priority
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
                Description
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={4}
                className={`w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-slate-400 resize-none ${errors.description
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : !errors.description && dirtyFields.description
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                placeholder="Describe the task in detail..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Assignee ID */}
            <div className="space-y-2">
              <label htmlFor="assignee_id" className="block text-sm font-semibold text-slate-700">
                Assignee ID
              </label>
              <input
                type="text"
                id="assignee_id"
                {...register('assignee_id')}
                className={`w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-slate-400 ${errors.assignee_id
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : !errors.assignee_id && dirtyFields.assignee_id
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                placeholder="Enter assignee ID..."
              />
              {errors.assignee_id && <p className="text-red-500 text-sm mt-1">{errors.assignee_id.message}</p>}
            </div>

            {/* Reset and Submit Button */}
            <div className="flex justify-end gap-4 mt-6">
              {/* Reset Button */}
              <button
                type="button"
                onClick={() => reset()}
                className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                Reset
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 shadow-md
                  ${isSubmitting || !isValid
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  }
                `}
              >
                {isSubmitting ? 'Updating...' : 'Update Task'}
              </button>
            </div>


            {/* Form Status */}
            <div className="text-center">
              <p className={`text-sm ${isValid ? 'text-green-500' : 'text-red-500'}`}>
                {isValid ? 'Form is valid ✓' : 'Please fill in all required fields correctly'}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}