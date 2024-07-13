import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const Post = ({ post = {} }) => {
  const { token } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [likes, setLikes] = useState(post.likes || []);

  const addComment = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/comment/${post._id}`,
        { text },
        config
      );
      setComments(res.data);
      setText('');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const likePost = async () => {
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/like/${post._id}`,
        {},
        config
      );
      setLikes(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const unlikePost = async () => {
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/unlike/${post._id}`,
        {},
        config
      );
      setLikes(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  if (!post._id) {
    return <div>No post found. Please create a new post.</div>;
  }

  return (
    <div>
      <h3>{post.name}</h3>
      <p>{post.text}</p>
      <button onClick={likePost}>Like</button>
      <button onClick={unlikePost}>Unlike</button>
      <p>{likes.length} likes</p>
      <form onSubmit={addComment}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.name}: {comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
