import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import Navbar from './components/Layout/Navbar';
import Posts from './components/Post/Posts';
import CreatePost from './components/Post/CreatePost';
import Notifications from './components/Notifications';
import Search from './components/Search/Search';
import MessageList from './components/Messages/MessageList';
import UserList from './components/Users/UserList';
import { AuthContext, AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<ProtectedRoutes />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <h2>Loading...</h2>; // You can replace this with a proper loading indicator
  }

  return isAuthenticated ? (
    <>
      <Routes>
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/search" element={<Search />} />
        <Route path="/messages/:recipientId" element={<MessageList />} />
        <Route path="/messages" element={<UserList />} />
        <Route path="*" element={<Navigate to="/profile" />} />
      </Routes>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
