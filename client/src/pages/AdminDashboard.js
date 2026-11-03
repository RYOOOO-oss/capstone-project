import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    repoUrl: '',
    liveUrl: ''
  });
  
  // Blog posts state
  const [posts, setPosts] = useState([]);
  const [postForm, setPostForm] = useState({
    title: '',
    content: ''
  });
  
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const projectsRes = await axios.get('/api/projects');
      setProjects(projectsRes.data.data);
      
      const postsRes = await axios.get('/api/blog');
      setPosts(postsRes.data.data);
      
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load data');
      setLoading(false);
    }
  };

  // Project form handlers
  const handleProjectChange = e => setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  
  const handleProjectSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/projects', projectForm);
      // Reset form
      setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
      // Refresh data
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create project');
    }
  };

  const handleDeleteProject = async id => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/api/projects/${id}`);
        fetchData();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete project');
      }
    }
  };

  // Blog post form handlers
  const handlePostChange = e => setPostForm({ ...postForm, [e.target.name]: e.target.value });
  
  const handlePostSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/blog', postForm);
      // Reset form
      setPostForm({ title: '', content: '' });
      // Refresh data
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
    }
  };

  const handleDeletePost = async id => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/api/blog/${id}`);
        fetchData();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete post');
      }
    }
  };

  if (loading) return <div className="container mx-auto p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}
      
      {/* Tabs */}
      <div className="border-b mb-6">
        <button
          className={`px-4 py-2 mr-2 ${activeTab === 'projects' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Manage Projects
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'blog' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          Manage Blog Posts
        </button>
      </div>

      {activeTab === 'projects' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
          <form onSubmit={handleProjectSubmit} className="space-y-4 mb-8 border p-6 rounded">
            <div>
              <label className="block mb-1">Title</label>
              <input type="text" name="title" value={projectForm.title} onChange={handleProjectChange} required className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-1">Description</label>
              <textarea name="description" value={projectForm.description} onChange={handleProjectChange} required rows="3" className="w-full p-2 border rounded"></textarea>
            </div>
            <div>
              <label className="block mb-1">Image URL</label>
              <input type="text" name="imageUrl" value={projectForm.imageUrl} onChange={handleProjectChange} className="w-full p-2 border rounded" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Repo URL</label>
                <input type="text" name="repoUrl" value={projectForm.repoUrl} onChange={handleProjectChange} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block mb-1">Live URL</label>
                <input type="text" name="liveUrl" value={projectForm.liveUrl} onChange={handleProjectChange} className="w-full p-2 border rounded" />
              </div>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Project</button>
          </form>

          <h2 className="text-2xl font-bold mb-4">Existing Projects</h2>
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project._id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description.substring(0, 100)}...</p>
                </div>
                <button onClick={() => handleDeleteProject(project._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'blog' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Blog Post</h2>
          <form onSubmit={handlePostSubmit} className="space-y-4 mb-8 border p-6 rounded">
            <div>
              <label className="block mb-1">Title</label>
              <input type="text" name="title" value={postForm.title} onChange={handlePostChange} required className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-1">Content</label>
              <textarea name="content" value={postForm.content} onChange={handlePostChange} required rows="8" className="w-full p-2 border rounded"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Post</button>
          </form>

          <h2 className="text-2xl font-bold mb-4">Existing Posts</h2>
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post._id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.content.substring(0, 100)}...</p>
                </div>
                <button onClick={() => handleDeletePost(post._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
