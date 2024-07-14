import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      try {
        const res = await axios.get('http://localhost:5000/api/notifications', config);
        setNotifications(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchNotifications();
  }, [token]);

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>{notification.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
