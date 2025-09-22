// GraphQL Types based on your schema
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

// Input types for mutations
export interface TaskInput {
  title: string;
  description: string;
  status: TaskStatus;
}

// GraphQL operation types
export interface GetAllTasksQuery {
  getAllTasks: Task[];
}

export interface CreateTaskMutation {
  createTask: Task;
}

export interface CreateTaskVariables {
  task: TaskInput;
}

export interface UpdateTaskStatusMutation {
  updateTaskStatus: boolean;
}

export interface UpdateTaskStatusVariables {
  id: string;
}