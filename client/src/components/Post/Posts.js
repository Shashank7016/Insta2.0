import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const config = {
        headers: {
          'x-auth-token': token
        }
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

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.name}</h3>
          <p>{post.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
