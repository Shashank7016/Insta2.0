import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const Post = () => {
  const [text, setText] = useState('');
  const { token } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    };

    try {
      await axios.post('http://localhost:5000/api/posts', { text }, config);
      setText('');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        name="text"
        cols="30"
        rows="5"
        placeholder="Create a post"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Post;
