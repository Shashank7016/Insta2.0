import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const FollowButton = ({ userId }) => {
  const { token } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);

  const followUser = async () => {
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      await axios.put(`http://localhost:5000/api/follow/${userId}`, {}, config);
      setIsFollowing(true);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const unfollowUser = async () => {
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      await axios.put(`http://localhost:5000/api/unfollow/${userId}`, {}, config);
      setIsFollowing(false);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <button onClick={isFollowing ? unfollowUser : followUser}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
