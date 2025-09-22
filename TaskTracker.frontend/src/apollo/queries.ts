import { gql } from '@apollo/client';

// Query to get all tasks
export const GET_ALL_TASKS = gql`
  query GetAllTasks {
    getAllTasks {
      id
      title
      description
      status
    }
  }
`;

// Mutation to create a new task
export const CREATE_TASK = gql`
  mutation CreateTask($task: TaskInput!) {
    createTask(task: $task) {
      id
      title
      description
      status
    }
  }
`;

// Mutation to update task status
export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($id: ID!) {
    updateTaskStatus(id: $id)
  }
`;