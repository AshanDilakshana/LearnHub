import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { createComment, getCommentsByPostId, updateComment, deleteComment } from '../api';

function Comment({ postId, userId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    getCommentsByPostId(postId).then((res) => setComments(res.data));
  }, [postId]);

  const handleCreate = () => {
    createComment({ postId, userId, content: newComment }).then((res) => {
      setComments([...comments, res.data]);
      setNewComment('');
    });
  };

  const handleUpdate = (comment) => {
    updateComment(comment.id, { ...comment, content: editingComment }).then((res) => {
      setComments(comments.map((c) => (c.id === comment.id ? res.data : c)));
      setEditingComment(null);
    });
  };

  const handleDelete = (id) => {
    deleteComment(id).then(() => {
      setComments(comments.filter((c) => c.id !== id));
    });
  };

  return (
    <div>
      <TextField
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button onClick={handleCreate}>Add Comment</Button>
      {comments.map((comment) => (
        <div key={comment.id}>
          {editingComment === comment.id ? (
            <TextField
              value={editingComment}
              onChange={(e) => setEditingComment(e.target.value)}
            />
          ) : (
            <p>{comment.content}</p>
          )}
          <Button onClick={() => setEditingComment(comment.id)}>Edit</Button>
          {editingComment === comment.id && (
            <Button onClick={() => handleUpdate(comment)}>Save</Button>
          )}
          <Button onClick={() => handleDelete(comment.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}

export default Comment;