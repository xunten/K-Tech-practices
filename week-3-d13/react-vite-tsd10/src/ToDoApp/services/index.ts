import type { Task } from '../types/type';

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

export const createTask = async (task: Task, token: string) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  return response.json();
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

export const getTasksByAssignee = async (assigneeId: number, token: string) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/assignee/${assigneeId}`, {
    headers: 
    {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
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