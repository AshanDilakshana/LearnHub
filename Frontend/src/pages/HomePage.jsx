import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { getAllPosts } from '../api';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const userId = "user-id"; // Replace with actual user ID
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts().then((res) => setPosts(res.data));
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <Box sx={{ p: 2 }}>
      <CreatePost userId={userId} onPostCreated={handlePostCreated} />
      {posts.map((post) => (
        <Box key={post.id} onClick={() => navigate(`/video/${post.id}`)}>
          <Post post={post} userId={userId} />
        </Box>
      ))}
    </Box>
  );
}

export default HomePage;