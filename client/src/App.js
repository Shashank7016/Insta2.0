import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import Navbar from './components/Layout/Navbar';
import { AuthContext, AuthProvider } from './contexts/AuthContext';

const App = () => {
  const { loading, isAuthenticated } = useContext(AuthContext);

  if (loading) {
    return <h2>Loading...</h2>; // You can replace this with a proper loading indicator
  }
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>  
    </Router>
  );
};

export default App;
