import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import Navbar from './components/Layout/Navbar';
import Post from './components/Post/Post';
import Posts from './components/Post/Posts';
import CreatePost from './components/Post/CreatePost';
import Notifications from './components/Notifications';
import Search from './components/Search/Search';
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
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </AuthProvider>  
    </Router>
  );
};

export default App;
