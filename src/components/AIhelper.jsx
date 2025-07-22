import React, { useState } from 'react';
import axios from 'axios';

const AIhelper = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('https://blogwala.vercel.app/api/gemini', {
        prompt: prompt,
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to get response from AI.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
      <h2>Ask Gemini AI</h2>
      <textarea
        rows="5"
        cols="60"
        placeholder="Type a question, blog idea, etc..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Thinking...' : 'Submit'}
      </button>
      <div style={{ marginTop: '20px' }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default AIhelper;
