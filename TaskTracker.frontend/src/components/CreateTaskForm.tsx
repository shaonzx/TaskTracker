import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import {
  Form,
  TextField,
  TextArea,
  Picker,
  Item,
  Button,
  Flex,
  View,
  Heading,
  Text,
  Well
} from '@adobe/react-spectrum';
import { CREATE_TASK, GET_ALL_TASKS } from '../apollo/queries';
import {
  CreateTaskMutation,
  CreateTaskVariables,
  TaskStatus,
  TaskInput
} from '../types/graphql';

const CreateTaskForm: React.FC = () => {
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.PENDING);
 
  // Apollo mutation hook
  const [createTask, { loading, error }] = useMutation<
    CreateTaskMutation,
    CreateTaskVariables
  >(CREATE_TASK, {
    // Refresh the task list after creating a task
    refetchQueries: [{ query: GET_ALL_TASKS }],
    onCompleted: () => {
      // Clear form after successful creation
      setTitle('');
      setDescription('');
      setStatus(TaskStatus.PENDING);
    }
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    if (!title.trim() || !description.trim()) {
      return; // Don't submit if title or description is empty
    }

    const taskInput: TaskInput = {
      title: title.trim(),
      description: description.trim(),
      status
    };

    try {
      await createTask({
        variables: { task: taskInput }
      });
    } catch (err) {
      // Error is handled by Apollo and displayed below
      console.error('Error creating task:', err);
    }
  };

  // Status options for the picker
  const statusOptions = [
    { key: TaskStatus.PENDING, label: 'Pending' },
    { key: TaskStatus.IN_PROGRESS, label: 'In Progress' },
    { key: TaskStatus.COMPLETED, label: 'Completed' }
  ];

  return (
    <View
      padding="size-400"
      borderRadius="large"
      UNSAFE_style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
    >
      <Heading 
        level={3} 
        marginBottom="size-300" 
        UNSAFE_style={{ 
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1rem'
        }}
      >
        🎯 Create New Task
      </Heading>
      
      <Form onSubmit={handleSubmit}>
        <Flex direction="column" gap="size-300">
          {/* Title Field */}
          <TextField
            label="Task Title"
            value={title}
            onChange={setTitle}
            isRequired
            placeholder="Enter task title..."
            validationState={!title.trim() && title !== '' ? 'invalid' : 'valid'}
          />

          {/* Description Field */}
          <TextArea
            label="Description"
            value={description}
            onChange={setDescription}
            isRequired
            placeholder="Enter task description..."
            height="size-1000"
            validationState={!description.trim() && description !== '' ? 'invalid' : 'valid'}
          />

          {/* Status Picker */}
          <Picker
            label="Initial Status"
            selectedKey={status}
            onSelectionChange={(key) => setStatus(key as TaskStatus)}
            items={statusOptions}
          >
            {(item) => <Item key={item.key}>{item.label}</Item>}
          </Picker>

          {/* Error Display */}
          {error && (
            <Well 
              role="region" 
              aria-label="Error message"
              UNSAFE_style={{
                background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                border: '1px solid #fca5a5',
                borderRadius: '8px'
              }}
            >
              <Text UNSAFE_style={{ 
                color: '#dc2626',
                fontWeight: '500'
              }}>
                ❌ Error: {error.message}
              </Text>
            </Well>
          )}

          {/* Submit Button */}
          <Flex justifyContent="end" marginTop="size-300">
            <Button
              variant="cta"
              type="submit"
              isDisabled={!title.trim() || !description.trim() || loading}
              UNSAFE_style={{
                background: loading 
                  ? '#9ca3af' 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontWeight: '600',
                fontSize: '14px',
                boxShadow: loading 
                  ? 'none' 
                  : '0 4px 15px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.2s ease',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '⏳ Creating...' : '✨ Create Task'}
            </Button>
          </Flex>
        </Flex>
      </Form>
    </View>
  );
};

export default CreateTaskForm;