import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import FeedbackButtons from './components/FeedbackButtons';


function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMsg = { sender: 'user', text: trimmedInput };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await axios.post('http://localhost:5000/chat', {
        message: trimmedInput
      });

      const botMsg = { sender: 'bot', text: res.data.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        sender: 'bot',
        text: '❌ Error contacting server. Please try again.'
      };
      setMessages(prev => [...prev, errorMsg]);
      console.error('Error:', err.message);
    }

    setInput('');
  };

  return (
    <div className="App">
      <h2>FAQ Chatbot</h2>

      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender}>
            <p>{msg.text}</p>
            {msg.sender === 'bot' && (
              <FeedbackButtons onFeedback={(type) => console.log(`Feedback for message ${idx}:`, type)} />
            )}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your question..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
