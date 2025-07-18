import type { Task } from '../types/type';
import { apiClient } from "../lib/api-client"

const baseUrl = 'https://server.aptech.io';

// const defaultHeaders = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
//   Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
// };

// export const login = async (username: string, password: string) => {
//   const response = await fetch(`${baseUrl}/auth/login`, {
//     method: 'POST',
//     headers: defaultHeaders,
//     body: JSON.stringify({ username, password }),
//   });
//   return response.json();
// };
// 

// tối ưu
// export const getTasks = async () => {
//   return await apiClient.get('/workspaces/tasks');
// };

// export const getTaskById = async (id: number) => {
//   return await apiClient.get(`/workspaces/tasks/${id}`);
// };

// export const createTask = async (task: Task) => {
//   return await apiClient.post('/workspaces/tasks', task);
// };

// export const updateTask = async (task: Task): Promise<Task> => {
//   const updated = { ...task };
//   delete updated.id; // Loại bỏ `id` khỏi payload
//   return await apiClient.patch(`/workspaces/tasks/${task.id}`, updated);
// };

// export const getTasksByAssignee = async (assigneeId: number) => {
//   return await apiClient.get(`/workspaces/tasks/assignee/${assigneeId}`);
// };

// export const deleteTask = async (taskId: string): Promise<void> => {
//   await apiClient.delete(`/workspaces/tasks/${taskId}`);
// };

// thủ công
export const getTasks = async (token: string) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getTaskById = async (id: number, token: string) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${id}`, {
    headers: 
    {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const createTask = async (task: Task): Promise<Task> => {
  const response = await apiClient.post('/workspaces/tasks', task);
  return response.data;
};

export const updateTask = async (task: Task, token: string): Promise<Task> => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...task, id: undefined }), // Exclude id from the body
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return await response.json();
};

export const getTasksByAssignee = async (assigneeId: number): Promise<Task[]> => {
  const response = await apiClient.get<Task[]>(`/workspaces/tasks/assignee/${assigneeId}`);
  return response.data;
};

export const deleteTask = async (taskId: string, token: string): Promise<void> => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};