import API from './axios';
import type { Task } from '@/types/task';

export interface TaskInput {
  name: string;
  description?: string;
  status?: "Pending" | "In Progress" | "Done";
  priorityLevel?: 'Low' | 'Medium' | 'High';
}

interface APIResponseTask {
  _id: string;
  name: string;
  description?: string;
  status: "Pending" | "In Progress" | "Done";
  priorityLevel: 'Low' | 'Medium' | 'High';
  createdAt: string;
  updatedAt: string;
}

interface PaginatedTaskResponse {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
}

type AxiosErrorResponse = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

function getErrorMessage(error: unknown, fallback = 'An error occurred'): string {
  const err = error as AxiosErrorResponse;

  if (
    err.response?.data?.message &&
    typeof err.response.data.message === 'string'
  ) {
    return err.response.data.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}


// Validate MongoDB ObjectId format (24 hex chars)
const isValidObjectId = (id: string): boolean => /^[0-9a-fA-F]{24}$/.test(id);

/**
 * Fetch paginated list of tasks
 */
export const getTasks = async (
  page = 1,
  limit = 10
): Promise<PaginatedTaskResponse> => {
  try {
    const response = await API.get(`/tasks?page=${page}&limit=${limit}`);

    const transformedTasks: Task[] = response.data.data.map(
      (task: APIResponseTask) => ({
        _id: task._id,
        name: task.name,
        description: task.description ?? '',
        status: task.status,
        priorityLevel: task.priorityLevel,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      })
    );

    return {
      tasks: transformedTasks,
      total: response.data.meta.total,
      page: response.data.meta.page,
      limit: response.data.meta.limit,
    };
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, 'Failed to fetch tasks'));
  }
};

/**
 * Create a new task
 */
export const createTask = async (taskData: TaskInput): Promise<Task> => {
  if (!taskData.name || typeof taskData.name !== 'string') {
    throw new Error('Task name is required and must be a string');
  }

  try {
    const response = await API.post<Task>('/tasks', taskData);
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, 'Failed to create task'));
  }
};

/**
 * Get task details by ID
 */
export const getTaskById = async (id: string): Promise<Task> => {
  if (!isValidObjectId(id)) {
    throw new Error('Invalid task ID');
  }

  try {
    const response = await API.get<Task>(`/tasks/${id}`);
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, 'Failed to fetch task'));
  }
};

/**
 * Update task by ID with partial fields
 */
export const updateTask = async (
  id: string,
  updates: Partial<TaskInput>
): Promise<Task> => {
  if (!isValidObjectId(id)) {
    throw new Error('Invalid task ID');
  }

  if (Object.keys(updates).length === 0) {
    throw new Error('At least one field is required to update the task');
  }

  try {
    const response = await API.put<Task>(`/tasks/${id}`, updates);
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, 'Failed to update task'));
  }
};

/**
 * Update only task status
 */
export const updateTaskStatus = async (
  id: string,
  status: Task['status']
): Promise<Task> => {
  if (!isValidObjectId(id)) {
    throw new Error('Invalid task ID');
  }

  if (!status) {
    throw new Error('Task status is required');
  }

  try {
    const response = await API.patch<Task>(`/tasks/status/${id}`, { status });
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, 'Failed to update task status'));
  }
};

/**
 * Update only task priority level
 */
export const updateTaskPriority = async (
  id: string,
  priorityLevel: Task['priorityLevel']
): Promise<Task> => {
  if (!isValidObjectId(id)) {
    throw new Error('Invalid task ID');
  }

  if (!priorityLevel) {
    throw new Error('Priority level is required');
  }

  try {
    const response = await API.patch<Task>(`/tasks/priority/${id}`, { priorityLevel });
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, 'Failed to update task priority'));
  }
};

/**
 * Delete task by ID
 */
export const deleteTask = async (id: string): Promise<{ message: string }> => {
  if (!isValidObjectId(id)) {
    throw new Error('Invalid task ID');
  }

  try {
    const response = await API.delete<{ message: string }>(`/tasks/${id}`);
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, 'Failed to delete task'));
  }
};
