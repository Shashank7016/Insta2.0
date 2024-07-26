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
        <Post key={post._id} post={post}>
          <h3>{post.name}</h3>
          <p>{post.text}</p>
          {post.media && (
            post.media.endsWith('.mp4') || post.media.endsWith('.mov') || post.media.endsWith('.avi') ?
              <video src={`http://localhost:5000/${post.media}`} controls /> :
              <img src={`http://localhost:5000/${post.media}`} alt="media" />
          )}
        </Post>
      ))}
    </div>
  );
};

export default Posts;
