import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="text-gray-500 text-sm mb-2">By {post.author?.username} • {new Date(post.createdAt).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-4">{post.content.substring(0, 150)}...</p>
      <Link to={`/blog/${post._id}`} className="text-blue-500 hover:underline">Read More</Link>
    </div>
  );
};

export default BlogPostCard;
