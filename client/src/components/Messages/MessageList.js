import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';

const MessageList = () => {
  const { token, user } = useContext(AuthContext);
  const { recipientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${recipientId}`, config);
        setMessages(res.data);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    if (recipientId) {
      fetchMessages();
    }
  }, [token, recipientId]);

  const onChange = (e) => setText(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    try {
      const res = await axios.post('http://localhost:5000/api/messages', { recipientId, text }, config);
      setMessages([res.data, ...messages]);
      setText('');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h1>Messages with {recipientId}</h1>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <p><strong>{message.sender === user._id ? 'You' : 'Them'}:</strong> {message.text}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Type a message"
          value={text}
          onChange={onChange}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageList;
