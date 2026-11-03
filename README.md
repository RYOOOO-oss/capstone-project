# Capstone Project: Full-Stack Portfolio & Blog Application

This is a complete full-stack personal portfolio and blog application, built as the capstone project for the Web Data Management and Application course.

## Live Demo
- **Frontend (Portfolio Website)**: [Your Deployed Frontend URL] (e.g., https://your-portfolio.vercel.app)
- **Backend API**: [Your Deployed Backend URL] (e.g., https://your-api.onrender.com)

## Features
- **Personal Portfolio**: Showcase your projects with descriptions, images, and links to code/live demos
- **Blog System**: Write and manage blog posts, with comment functionality
- **Admin Dashboard**: Secure admin area to manage your projects and blog content
- **Authentication**: JWT-based secure authentication for admin users
- **Responsive Design**: Modern, responsive UI built with React and Tailwind CSS

## Tech Stack
### Backend
- Node.js & Express.js
- MongoDB Atlas (with Mongoose ODM)
- JWT Authentication
- Bcrypt for password hashing
- Helmet for security headers
- CORS support

### Frontend
- React.js (Single Page Application)
- React Router for client-side routing
- Context API for global state management
- Tailwind CSS for styling
- Axios for API communication

## API Endpoints

### System
- `GET /health` - Health check for the hosting platform; returns 200 `{status:"ok"}` when the database is connected

### Authentication
- `POST /api/users/register` - Register a new admin user
- `POST /api/users/login` - Login and get JWT token

### Projects
- `GET /api/projects` - Get all portfolio projects (Public)
- `GET /api/projects/:id` - Get a single project (Public)
- `POST /api/projects` - Create a new project (Protected)
- `PUT /api/projects/:id` - Update a project (Protected)
- `DELETE /api/projects/:id` - Delete a project (Protected)

### Blog
- `GET /api/blog` - Get all blog posts (Public)
- `GET /api/blog/:id` - Get a single blog post with comments (Public)
- `POST /api/blog` - Create a new blog post (Protected)
- `PUT /api/blog/:id` - Update a blog post (Protected/Author only)
- `DELETE /api/blog/:id` - Delete a blog post (Protected/Author only)

### Comments
- `GET /api/blog/:postId/comments` - Get all comments for a post (Public)
- `POST /api/blog/:postId/comments` - Add a comment to a post (Protected)

### Contact
- `POST /api/contact` - Submit a contact form message (Public)

## Local Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd CapstoneProject
```

### 2. Backend Setup
```bash
cd server
npm install

# Copy the example env file and fill in your values
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, etc.

# Start the development server
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install

# Copy the example env file and fill in your backend URL
cp .env.example .env
# Edit .env with your backend API URL

# Start the frontend development server
npm start
```

### 4. Access the application
- Frontend will be running at `http://localhost:3000`
- Backend API will be running at `http://localhost:5000`

## Deployment
### Backend
You can deploy the backend to platforms like:
- Render
- Heroku
- Railway

### Frontend
You can deploy the frontend to platforms like:
- Vercel
- Netlify
- GitHub Pages

## Submission
This project is ready for submission. The zip file includes:
- Complete backend source code
- Complete frontend source code
- This README.md file with all required information

Note: The `node_modules` folders have been excluded to keep the file size small. You will need to run `npm install` in both `server` and `client` folders to install dependencies when running locally.
