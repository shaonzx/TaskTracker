import React from 'react';
import {
  View,
  Heading,
  Divider,
  Flex
} from '@adobe/react-spectrum';
import TaskList from './components/TaskList';
import CreateTaskForm from './components/CreateTaskForm';
import './App.css';

function App() {
  return (
    <View 
      height="100vh" 
      UNSAFE_style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <View 
        padding="size-400" 
        UNSAFE_style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <Flex justifyContent="center">
          <View maxWidth="1400px" width="100%">
            <Heading 
              level={1} 
              margin="size-0"
              UNSAFE_style={{ 
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                fontSize: '2.5rem',
                fontWeight: '700'
              }}
            >
              ✨ Task Tracker
            </Heading>
          </View>
        </Flex>
      </View>
     
      {/* Main Content */}
      <View padding="size-400" overflow="auto" height="calc(100vh - 100px)">
        <Flex justifyContent="center">
          <View maxWidth="1400px" width="100%">
            <Flex
              direction={{ base: 'column', L: 'row' }}
              gap="size-500"
              height="100%"
            >
              {/* Form Section */}
              <View
                flex={{ base: 'none', L: '0 0 400px' }}
                UNSAFE_style={{
                  minWidth: '350px',
                  maxWidth: '450px'
                }}
              >
                <CreateTaskForm />
              </View>
             
              {/* Tasks Section */}
              <View
                flex="1"
                UNSAFE_style={{
                  minWidth: '0',
                  overflow: 'hidden'
                }}
              >
                <TaskList />
              </View>
            </Flex>
          </View>
        </Flex>
      </View>
    </View>
  );
}

export default App;