import { useState } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import { updatePost, deletePost, likePost } from '../api';
import Comment from './Comment';

function Post({ post, userId }) {
  const [description, setDescription] = useState(post.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    updatePost(post.id, { ...post, description }).then(() => setIsEditing(false));
  };

  const handleDelete = () => {
    deletePost(post.id);
  };

  const handleLike = () => {
    likePost(post.id, userId);
  };

  return (
    <Box sx={{ border: '1px solid #ccc', p: 2, mb: 2 }}>
      {isEditing ? (
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
        />
      ) : (
        <Typography>{post.description}</Typography>
      )}
      {post.photoUrl && (
        <Box sx={{ mt: 2 }}>
          <img src={post.photoUrl} alt="Post" style={{ maxWidth: '100%' }} />
        </Box>
      )}
      {post.videoUrl && (
        <Box sx={{ mt: 2 }}>
          <video src={post.videoUrl} controls style={{ maxWidth: '100%' }} />
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
        {isEditing && <Button onClick={handleUpdate}>Save</Button>}
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleLike}>Like ({post.likes.length})</Button>
      </Box>
      <Comment postId={post.id} userId={userId} />
    </Box>
  );
}

export default Post;