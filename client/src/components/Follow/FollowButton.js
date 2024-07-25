import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const FollowButton = ({ userId }) => {
  const { token, user } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${user._id}`, config);
        setIsFollowing(res.data.following.some(follow => follow.toString() === userId));
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    if (user._id && userId) {
      checkFollowingStatus();
    }
  }, [token, user._id, userId]);

  const followUser = async () => {
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      const res = await axios.put(`http://localhost:5000/api/follow/follow/${userId}`, {}, config);
      setIsFollowing(true);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  const unfollowUser = async () => {
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      const res = await axios.put(`http://localhost:5000/api/follow/unfollow/${userId}`, {}, config);
      setIsFollowing(false);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <>
      {isFollowing ? (
        <button onClick={unfollowUser}>Unfollow</button>
      ) : (
        <button onClick={followUser}>Follow</button>
      )}
    </>
  );
};

export default FollowButton;
