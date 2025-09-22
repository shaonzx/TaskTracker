import React from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  View,
  Heading,
  ProgressCircle,
  IllustratedMessage,
  Content,
  ListView,
  Item,
  Text,
  Flex,
  StatusLight,
  Checkbox
} from '@adobe/react-spectrum';
import { GET_ALL_TASKS, UPDATE_TASK_STATUS } from '../apollo/queries';
import { GetAllTasksQuery, Task, TaskStatus, UpdateTaskStatusMutation, UpdateTaskStatusVariables } from '../types/graphql';

const TaskList: React.FC = () => {
  const { data, loading, error } = useQuery<GetAllTasksQuery>(GET_ALL_TASKS);
  
  const [updateTaskStatus] = useMutation<UpdateTaskStatusMutation, UpdateTaskStatusVariables>(
    UPDATE_TASK_STATUS,
    {
      refetchQueries: [{ query: GET_ALL_TASKS }]
    }
  );

  // Helper function to get status color
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return 'positive';
      case TaskStatus.IN_PROGRESS:
        return 'notice';
      case TaskStatus.PENDING:
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  // Helper function to get status background color
  const getStatusBgColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return 'linear-gradient(135deg, #d1fae5, #a7f3d0)';
      case TaskStatus.IN_PROGRESS:
        return 'linear-gradient(135deg, #fef3c7, #fde68a)';
      case TaskStatus.PENDING:
        return 'linear-gradient(135deg, #f3f4f6, #e5e7eb)';
      default:
        return 'linear-gradient(135deg, #f3f4f6, #e5e7eb)';
    }
  };

  // Helper function to format status text
  const formatStatus = (status: TaskStatus) => {
    return status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  // Helper function to get status emoji
  const getStatusEmoji = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return '✅';
      case TaskStatus.IN_PROGRESS:
        return '🚀';
      case TaskStatus.PENDING:
        return '⏳';
      default:
        return '⏳';
    }
  };

  // Handle checkbox change
  const handleTaskToggle = async (task: Task) => {
    try {
      await updateTaskStatus({
        variables: { id: task.id }
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) {
    return (
      <View 
        padding="size-400" 
        borderRadius="large"
        height="400px"
        UNSAFE_style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Flex direction="column" alignItems="center" gap="size-300">
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '50%',
            padding: '20px',
            animation: 'pulse 2s infinite'
          }}>
            <ProgressCircle 
              aria-label="Loading tasks..." 
              isIndeterminate 
              UNSAFE_style={{ color: 'white' }}
            />
          </div>
          <Text UNSAFE_style={{ 
            color: '#667eea',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            ✨ Loading your awesome tasks...
          </Text>
        </Flex>
      </View>
    );
  }

  if (error) {
    return (
      <View 
        padding="size-400" 
        borderRadius="large"
        height="400px"
        UNSAFE_style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <IllustratedMessage>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            😵
          </div>
          <Heading 
            level={4}
            UNSAFE_style={{
              color: '#dc2626',
              marginBottom: '8px'
            }}
          >
            Oops! Something went wrong
          </Heading>
          <Content>
            <Text UNSAFE_style={{ color: '#6b7280', marginBottom: '4px' }}>
              {error.message}
            </Text>
            <Text UNSAFE_style={{ color: '#9ca3af', fontSize: '14px' }}>
              Make sure your GraphQL server is running
            </Text>
          </Content>
        </IllustratedMessage>
      </View>
    );
  }

  if (!data?.getAllTasks || data.getAllTasks.length === 0) {
    return (
      <View 
        padding="size-400" 
        borderRadius="large"
        height="400px"
        UNSAFE_style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <IllustratedMessage>
          <div style={{
            fontSize: '64px',
            marginBottom: '16px'
          }}>
            📝
          </div>
          <Heading 
            level={4}
            UNSAFE_style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '8px'
            }}
          >
            Ready to be productive?
          </Heading>
          <Content>
            <Text UNSAFE_style={{ color: '#6b7280', fontSize: '16px' }}>
              Create your first task to get started! 🚀
            </Text>
          </Content>
        </IllustratedMessage>
      </View>
    );
  }

  return (
    <View 
      borderRadius="large"
      UNSAFE_style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <View 
        padding="size-300" 
        UNSAFE_style={{ 
          flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
          borderBottom: '1px solid rgba(102, 126, 234, 0.1)'
        }}
      >
        <Heading 
          level={3} 
          margin="size-0" 
          UNSAFE_style={{ 
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}
        >
          📋 Your Tasks ({data.getAllTasks.length})
        </Heading>
      </View>
      
      {/* Scrollable Content */}
      <View 
        UNSAFE_style={{
          flex: 1,
          overflow: 'auto',
          minHeight: 0
        }}
      >
        <ListView
          items={data.getAllTasks}
          aria-label="Task list"
          selectionMode="none"
          UNSAFE_style={{
            border: 'none',
            height: '100%'
          }}
        >
          {(task: Task) => (
            <Item key={task.id} textValue={task.title}>
              <View
                padding="size-250"
                UNSAFE_style={{
                  borderBottom: '1px solid rgba(102, 126, 234, 0.1)',
                  transition: 'all 0.2s ease',
                  background: task.status === TaskStatus.COMPLETED 
                    ? 'linear-gradient(135deg, rgba(209, 250, 229, 0.6), rgba(167, 243, 208, 0.4))'
                    : 'transparent',
                  position: 'relative'
                }}
              >
                <Flex direction="row" alignItems="start" gap="size-250">
                  {/* Checkbox */}
                  <View UNSAFE_style={{ paddingTop: '4px', flexShrink: 0 }}>
                    <Checkbox
                      isSelected={task.status === TaskStatus.COMPLETED}
                      onChange={() => handleTaskToggle(task)}
                    />
                  </View>
                  
                  {/* Task Content */}
                  <View UNSAFE_style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                    {/* Title and Status Row */}
                    <Flex 
                      direction="row" 
                      justifyContent="space-between" 
                      alignItems="center"
                      marginBottom="size-100"
                      gap="size-200"
                    >
                      <Text 
                        UNSAFE_style={{
                          textDecoration: task.status === TaskStatus.COMPLETED ? 'line-through' : 'none',
                          opacity: task.status === TaskStatus.COMPLETED ? 0.6 : 1,
                          color: '#374151',
                          fontWeight: '600',
                          fontSize: '16px',
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {task.title}
                      </Text>
                      <View 
                        UNSAFE_style={{ 
                          flexShrink: 0, 
                          marginLeft: '12px',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          background: getStatusBgColor(task.status),
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span style={{ fontSize: '12px' }}>
                          {getStatusEmoji(task.status)}
                        </span>
                        <Text UNSAFE_style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          color: task.status === TaskStatus.COMPLETED 
                            ? '#059669' 
                            : task.status === TaskStatus.IN_PROGRESS 
                            ? '#d97706' 
                            : '#6b7280'
                        }}>
                          {formatStatus(task.status)}
                        </Text>
                      </View>
                    </Flex>
                    
                    {/* Description */}
                    {task.description && (
                      <Text 
                        UNSAFE_style={{
                          textDecoration: task.status === TaskStatus.COMPLETED ? 'line-through' : 'none',
                          opacity: task.status === TaskStatus.COMPLETED ? 0.5 : 0.7,
                          lineHeight: '1.5',
                          fontSize: '14px',
                          color: '#6B7280',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {task.description}
                      </Text>
                    )}
                  </View>
                </Flex>
              </View>
            </Item>
          )}
        </ListView>
      </View>
    </View>
  );
};

export default TaskList;