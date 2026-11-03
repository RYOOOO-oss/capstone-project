import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">Hi, I'm a Developer</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Welcome to my personal portfolio! I build modern web applications using React, Node.js, and MongoDB.
          Check out my projects and blog posts below to see what I've been working on.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="/projects" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">View My Work</a>
          <a href="/contact" className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600">Contact Me</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
