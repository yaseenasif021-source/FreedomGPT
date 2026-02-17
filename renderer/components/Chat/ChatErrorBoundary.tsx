import React from 'react';
import { FallbackProps } from 'react-error-boundary';

interface ChatErrorBoundaryProps {
  children: React.ReactNode;
}

const ChatErrorBoundary: React.FC<ChatErrorBoundaryProps> = ({ children }) => {
  const handleReset = () => {
    // Reset logic (e.g., reload the chat, clear error state, etc.)
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
      {children}
    </ErrorBoundary>
  );
};

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div style={{ padding: '20px', textAlign: 'center', border: '1px solid red' }}>
      <h2>Something went wrong:</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

export default ChatErrorBoundary;