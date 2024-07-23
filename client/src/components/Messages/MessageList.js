import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import './MessageList.css'; // Ensure you have a CSS file for additional styling

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

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  let lastDate = '';

  return (
    <div className="message-container">
      <h1>Messages with {recipient ? recipient.username : 'Loading...'}</h1>
      <div className="messages">
        {messages.map((message) => {
          const currentDate = formatDate(message.date);
          const showDate = currentDate !== lastDate;
          lastDate = currentDate;
          return (
            <React.Fragment key={message._id}>
              {showDate && <div className="date-separator">{currentDate}</div>}
              <div className={`message ${message.sender === user._id ? 'sent' : 'received'}`}>
                <p>
                  <strong>{message.sender === user._id ? 'You' : recipient ? recipient.username : 'Them'}:</strong> {message.text}
                </p>
                <span className="message-time">{formatTime(message.date)}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <form onSubmit={onSubmit} className="message-form">
        <textarea
          name="text"
          cols="30"
          rows="3"
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
