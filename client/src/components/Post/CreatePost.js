import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);
  const { token } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    if (media) {
      formData.append('media', media);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': token,
      },
    };

    try {
      await axios.post('http://localhost:5000/api/posts', formData, config);
      setText('');
      setMedia(null);
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
        placeholder="Write a caption"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="file"
        name="media"
        accept="image/*,video/*"
        onChange={(e) => setMedia(e.target.files[0])}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreatePost;
