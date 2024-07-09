import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const config = {
          headers: { 'x-auth-token': token }
        };
        const res = await axios.get('http://localhost:5000/api/profile/me', config);
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const onChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: { 'x-auth-token': token }
      };
      const res = await axios.put('http://localhost:5000/api/profile/me', profile, config);
      setProfile(res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={onSubmit}>
          <div>
            <label>Username</label>
            <input type="text" name="username" value={profile.username} onChange={onChange} required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={profile.email} onChange={onChange} required />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
