import React, { createContext, useReducer, useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
};

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    if (localStorage.token) {
      axios.defaults.headers.common['x-auth-token'] = localStorage.token;
      try {
        const res = await axios.get('http://localhost:5000/api/auth');
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: res.data, token: localStorage.token },
        });
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['x-auth-token'];
        dispatch({ type: 'LOGOUT' });
        setLoading(false);
      }
    }
    setLoading(false);
    
  };
  

  useEffect(() => {
    loadUser();
  }, []);

  const register = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      if (res.data) {
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: res.data,
        });
        loadUser(); // Load user after registration
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      if (res.data) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data,
        });
        loadUser(); // Load user after login
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
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
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
