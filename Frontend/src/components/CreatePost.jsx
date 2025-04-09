import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createPost } from '../api';

function CreatePost({ userId, onPostCreated }) {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('userId', userId);
    if (photo) {
      formData.append('photo', photo);
    }
    if (video) {
      formData.append('video', video);
    }

    try {
      const response = await createPost(formData);
      onPostCreated(response.data);
      setDescription('');
      setPhoto(null);
      setVideo(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
      <Box sx={{ mb: 2 }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />
      </Box>
      <Button variant="contained" onClick={handleCreate}>
        Create Post
      </Button>
    </Box>
  );
}

export default CreatePost;