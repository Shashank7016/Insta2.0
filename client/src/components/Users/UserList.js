import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const UserList = () => {
  const { token, user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      try {
        const res = await axios.get('http://localhost:5000/api/users', config);
        setUsers(res.data);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users
          .filter((u) => u._id !== user._id) // Filter out the current user
          .map((u) => (
            <li key={u._id}>
              <Link to={`/messages/${u._id}`}>{u.username}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;
