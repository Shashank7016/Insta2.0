import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const FollowersList = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${id}/followers`, config);
        setFollowers(res.data);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    if (id) {
      fetchFollowers();
    }
  }, [id, token]);

  return (
    <div>
      <h2>Followers</h2>
      {followers.length === 0 ? (
        <p>No followers yet</p>
      ) : (
        <ul>
          {followers.map((follower) => (
            <li key={follower._id}>
              <Link to={`/profile/${follower._id}`}>{follower.username}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowersList;
