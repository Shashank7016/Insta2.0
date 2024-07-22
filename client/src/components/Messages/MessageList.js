import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';

const MessageList = () => {
  const { token, user } = useContext(AuthContext);
  const { recipientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [recipient, setRecipient] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${recipientId}`, config);
        setMessages(res.data.reverse()); // Reverse to have the latest message at the bottom
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    const fetchRecipient = async () => {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      try {
        const res = await axios.get(`http://localhost:5000/api/users/${recipientId}`, config);
        setRecipient(res.data);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    if (recipientId) {
      fetchMessages();
      fetchRecipient();
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
      setMessages((prevMessages) => [...prevMessages, res.data]);
      setText('');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  const messageStyle = (sender) => ({
    backgroundColor: sender === user._id ? '#dcf8c6' : '#ffffff',
    color: '#000000',
    padding: '10px',
    borderRadius: '20px',
    margin: '5px 0',
    maxWidth: '60%',
    display: 'inline-block',
    alignSelf: sender === user._id ? 'flex-end' : 'flex-start',
    marginBottom: '10px',
  });

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    overflowY: 'auto',
    height: '400px', // Adjust as needed
  };

  return (
    <div>
      <h1>Messages with {recipient ? recipient.name : 'Loading...'}</h1>
      <div style={containerStyle}>
        {messages.map((message) => (
          <div key={message._id} style={messageStyle(message.sender)}>
            <p>
              <strong>{message.sender === user._id ? 'You' : recipient ? recipient.name : 'Them'}:</strong> {message.text}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} style={{ marginTop: '20px' }}>
        <textarea
          name="text"
          cols="30"
          rows="3"
          placeholder="Type a message"
          value={text}
          onChange={onChange}
          required
          style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageList;
