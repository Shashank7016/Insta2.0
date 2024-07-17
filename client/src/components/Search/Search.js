import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Search = () => {
  const { token } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      const res = await axios.get(`http://localhost:5000/api/search?query=${query}`, config);
      setResults(res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="query"
          value={query}
          onChange={onChange}
          placeholder="Search users by username or email"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((user) => (
          <li key={user._id}>
            <Link to={`/profile/${user._id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
