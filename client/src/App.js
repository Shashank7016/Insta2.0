import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
import PageLayout from './components/Layout/PageLayout';
import { AuthContext, AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AnimatePresence mode="wait">
        <Routes>
          <Route path="/register" element={<PageLayout><Register /></PageLayout>} />
          <Route path="/login" element={<PageLayout><Login /></PageLayout>} />
          <Route
            path="*"
            element={<ProtectedRoutes />}
          />
        </Routes>
        </AnimatePresence>
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
      <AnimatePresence mode="wait">
      <Routes>
        <Route path="/profile/:id" element={<PageLayout><Profile /></PageLayout>} />
        <Route path="/posts" element={<PageLayout><Posts /></PageLayout>} />
        <Route path="/create-post" element={<PageLayout><CreatePost /></PageLayout>} />
        <Route path="/notifications" element={<PageLayout><Notifications /></PageLayout>} />
        <Route path="/search" element={<PageLayout><Search /></PageLayout>} />
        <Route path="/messages/:recipientId" element={<PageLayout><MessageList /></PageLayout>} />
        <Route path="/messages" element={<PageLayout><UserList /></PageLayout>} />
        <Route path="*" element={<Navigate to="/profile" />} />
      </Routes>
      </AnimatePresence>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
