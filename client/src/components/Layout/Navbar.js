import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, loading, user } = useContext(AuthContext);

  if (loading) {
    return <h2>Loading...</h2>; // Replace with a proper loading indicator if needed
  }

  const authLinks = (
    <ul>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/create-post">Create Post</Link>
      </li>
      <li>
        <Link to={`/profile/${user && user._id}`}>Profile</Link>
      </li>
      <li>
        <Link to="/notifications">Notifications</Link>
      </li>
      <li>
        <Link to="/search">Search</Link>
      </li>
      <li>
        <a href="#!" onClick={logout}>
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav>
      <h1>
        <Link to="/">Instagram Clone</Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
};

export default Navbar;
