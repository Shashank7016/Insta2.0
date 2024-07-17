import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import FollowButton from '../Follow/FollowButton';

const Profile = () => {
  const { token, user } = useContext(AuthContext);
  const { id } = useParams();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    username: '',
    followerCount: 0,
    followingCount: 0,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${id}`, config);
        setProfileData(res.data);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [token, id]);

  const onChange = (e) =>
    setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    try {
      await axios.put('http://localhost:5000/api/profile/me', profileData, config);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h1>{profileData.username}'s Profile</h1>
      {user && user._id !== id && (
        <FollowButton userId={id} />
      )}
      <p>Followers: {profileData.followerCount}</p>
      <p>Following: {profileData.followingCount}</p>
      {user && user._id === id && (
        <form onSubmit={onSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={onChange}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
