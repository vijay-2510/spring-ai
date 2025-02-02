import React, { useReducer, useState } from 'react'
import './App.css'

// Define action types
const ActionTypes = {
  SET_MESSAGE: 'SET_MESSAGE',
  SET_RESPONSE: 'SET_RESPONSE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
};

// Initial state
const initialState = {
  message: '',
  response: '',
  loading: false,
  error: '',
};

// Reducer function to handle state changes
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_MESSAGE:
      return { ...state, message: action.payload };
    case ActionTypes.SET_RESPONSE:
      return { ...state, response: action.payload };
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.message.trim()) return;

    // Dispatch action to set loading state to true
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    dispatch({ type: ActionTypes.SET_ERROR, payload: '' });
    dispatch({ type: ActionTypes.SET_RESPONSE, payload: '' });

    try {
      const encodedMessage = encodeURIComponent(state.message);
      const response = await fetch(`http://localhost:8080/api/v2/stream/${encodedMessage}`);

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      // Create a reader to read the response stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let text = '';

      // Read the stream in chunks
      while (!done) {
        const { value, done: isDone } = await reader.read();
        done = isDone;
        text += decoder.decode(value, { stream: true });

        // Dispatch the new response incrementally
        dispatch({ type: ActionTypes.SET_RESPONSE, payload: text });
      }

      // When done, close the reader
      reader.releaseLock();
    } catch (err) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: err.message });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

  return (
    <div className="container">
      <h1>DeepSeek Chat</h1>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={state.message}
          onChange={(e) => dispatch({ type: ActionTypes.SET_MESSAGE, payload: e.target.value })}
          placeholder="Type your message..."
          disabled={state.loading}
        />
        <button type="submit" disabled={state.loading}>
          {state.loading ? 'Sending...' : 'Send'}
        </button>
      </form>

      <div className="response-wrapper">
        {state.error && <div className="error">{state.error}</div>}

        {state.response && (
          <div className="response">
            <h2>Response:</h2>
            <p>{state.response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
