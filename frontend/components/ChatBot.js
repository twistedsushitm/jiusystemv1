import React, { useState } from "react";

export default function ChatBot(){
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userMessage = { sender: 'user', text: prompt };
    setMessages([...messages, userMessage]);
    setPrompt('');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/chat", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to get a response from the bot');
      }

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Error: Unable to fetch response.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg flex flex-col p-4 space-y-4">
        <div className="flex-1 overflow-y-auto max-h-96 space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-xs ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-200 text-gray-800 self-start'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
