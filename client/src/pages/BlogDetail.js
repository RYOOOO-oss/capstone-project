import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const BlogDetail = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRes = await axios.get(`/api/blog/${id}`);
        setPost(postRes.data.data);
        
        const commentsRes = await axios.get(`/api/blog/${id}/comments`);
        setComments(commentsRes.data.data);
        
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError(null);
    try {
      const res = await axios.post(`/api/blog/${id}/comments`, { body: commentBody });
      setComments([...comments, res.data.data]);
      setCommentBody('');
    } catch (err) {
      setCommentError(err.response?.data?.error || 'Failed to post comment');
    }
  };

  if (loading) return <div className="container mx-auto p-8">Loading...</div>;
  if (error) return <div className="container mx-auto p-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">By {post.author?.username} • {new Date(post.createdAt).toLocaleDateString()}</p>
      
      <div className="prose max-w-none mb-12">
        <p className="text-lg">{post.content}</p>
      </div>

      <hr className="my-8" />

      <div>
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        
        {comments.length === 0 && <p className="text-gray-500">No comments yet. Be the first to comment!</p>}
        
        <div className="space-y-4 mb-8">
          {comments.map(comment => (
            <div key={comment._id} className="border p-4 rounded-lg">
              <p className="font-bold">{comment.author?.username}</p>
              <p className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleDateString()}</p>
              <p className="mt-2">{comment.body}</p>
            </div>
          ))}
        </div>

        {currentUser ? (
          <form onSubmit={handleCommentSubmit} className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Add a Comment</h3>
            {commentError && <p className="text-red-500 mb-4">{commentError}</p>}
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="3"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              required
              placeholder="Write your comment..."
            ></textarea>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Post Comment</button>
          </form>
        ) : (
          <p className="text-gray-500">Please <a href="/login" className="text-blue-500">login</a> to leave a comment.</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
