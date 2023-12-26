import React, { createContext, useContext, useState, useEffect } from 'react';

// Helper function to get or initialize the context value
function getInitialContext() {
  const contextFromStorage = localStorage.getItem('context');
  if (contextFromStorage) {
    return JSON.parse(contextFromStorage);
  }
  return { participantId: null, timeTaken: 0, selectedOptions: [] };
}

// Create the context with a default value
export const StateContext = createContext({
  context: null,
  setContext: () => {},
  resetContext: () => {},  // Include resetContext here
});

// Define the context provider component
export function ContextProvider({ children }) {
  const [context, setContext] = useState(getInitialContext());

  // Define resetContext inside ContextProvider
  const resetContext = () => {
    const initialContext = getInitialContext();
    setContext(initialContext);
    localStorage.setItem('context', JSON.stringify(initialContext));
  };

  useEffect(() => {
    localStorage.setItem('context', JSON.stringify(context));
  }, [context]);

  // Include resetContext in the value provided to the context
  return (
    <StateContext.Provider value={{ context, setContext, resetContext }}>
      {children}
    </StateContext.Provider>
  );
}

// Custom hook to use the state context
export default function useStateContext() {
  // useContext will now correctly return the context value with resetContext
  const contextValue = useContext(StateContext);
  if (!contextValue) {
    console.error('Context value is null', contextValue);
    throw new Error('useStateContext must be used within a ContextProvider');
  }
  return contextValue;
}
