import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import './index.css';
import App from './App';
import apolloClient from './apollo/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Simple test function to make GET request
const makeTestRequest = async (): Promise<void> => {
  try {
    console.log('Making test GET request from index.tsx...');
    const response = await fetch('http://localhost:5000/api/Welcome');
    console.log('Response received:', response);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Test request successful:', data);
    } else {
      console.log('Test request failed with status:', response.status);
    }
  } catch (error) {
    console.error('Test request error:', error);
  }
};

// Make the test request and then render the app
makeTestRequest().then(() => {
  root.render(
    <React.StrictMode>
      <ApolloProvider client={apolloClient}>
        <Provider theme={defaultTheme}>
          <App />
        </Provider>
      </ApolloProvider>
    </React.StrictMode>
  );
});