import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const { name, email, message } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post('/api/contact', { name, email, message });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message');
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Message Sent!</h1>
        <p className="text-xl">Thank you for reaching out. I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Me</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            name="message"
            value={message}
            onChange={onChange}
            required
            rows="5"
            className="w-full p-3 border rounded"
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
