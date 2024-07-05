import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token')
};

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = async formData => {
    const res = await axios.post('/api/auth/register', formData);
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data
    });
  };

  const login = async formData => {
    const res = await axios.post('/api/auth/login', formData);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
