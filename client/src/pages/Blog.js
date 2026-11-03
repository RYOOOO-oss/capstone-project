import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPostCard from '../components/BlogPostCard';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/blog');
        setPosts(res.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load blog posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="container mx-auto p-8">Loading...</div>;
  if (error) return <div className="container mx-auto p-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
