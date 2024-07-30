import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const Stories = () => {
  const { token } = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      const config = {
        headers: {
          'x-auth-token': token
        }
      };

      try {
        const res = await axios.get('http://localhost:5000/api/stories', config);
        setStories(res.data);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    fetchStories();
  }, [token]);

  const onChange = e => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': token
      }
    };

    try {
      await axios.post('http://localhost:5000/api/stories', formData, config);
      setImage(null);
      // Fetch stories again to update the list
      const res = await axios.get('http://localhost:5000/api/stories', config);
      setStories(res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h2>Stories</h2>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onChange} accept="image/*" />
        <button type="submit">Upload Story</button>
      </form>
      <div className="stories-container">
        {stories.map(story => (
          <div key={story._id} className="story">
            <p>{story.user.username}</p>
            <img src={`http://localhost:5000/${story.imageUrl}`} alt="story" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
