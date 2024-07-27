import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const FollowingList = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${id}/following`, config);
        setFollowing(res.data);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    if (id) {
      fetchFollowing();
    }
  }, [id, token]);

  return (
    <div>
      <h2>Following</h2>
      {following.length === 0 ? (
        <p>Not following anyone yet</p>
      ) : (
        <ul>
          {following.map((user) => (
            <li key={user._id}>
              <Link to={`/profile/${user._id}`}>{user.username}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowingList;
