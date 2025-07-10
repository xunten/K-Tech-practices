import type { Task } from '../types/type';

const baseUrl = 'https://server.aptech.io';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const getTasks = async () => {
  const response = await fetch(`${baseUrl}/workspaces/tasks`, {
    headers: defaultHeaders,
  });
  return response.json();
};

export const getTaskById = async (id: number) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${id}`, {
    headers: defaultHeaders,
  });
  return response.json();
};

export const createTask = async (task: Task) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${task.id}`, {
    method: 'PATCH',
    headers: defaultHeaders,
    body: JSON.stringify({ ...task, id: undefined }), // Exclude id from the body
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return await response.json();
};

export const getTasksByAssignee = async (assigneeId: number) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/assignee/${assigneeId}`, {
    headers: defaultHeaders,
  });
  return response.json();
};