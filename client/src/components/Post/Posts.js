import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import Post from './Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      try {
        const res = await axios.get('http://localhost:5000/api/posts', config);
        setPosts(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchPosts();
  }, [token]);

  if (posts.length === 0) {
    return <div>No posts available. Please create a new post.</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
