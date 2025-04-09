import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { getUser, updateUser } from '../api';

function Profile({ userId }) {
  const [user, setUser] = useState({ name: '', bio: '' });

  useEffect(() => {
    getUser(userId).then((res) => setUser(res.data));
  }, [userId]);

  const handleUpdate = () => {
    updateUser(userId, user).then((res) => setUser(res.data));
  };

  return (
    <div>
      <TextField
        label="Name"
        value={user.name || ''}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <TextField
        label="Bio"
        value={user.bio || ''}
        onChange={(e) => setUser({ ...user, bio: e.target.value })}
      />
      <Button onClick={handleUpdate}>Update Profile</Button>
    </div>
  );
}

export default Profile;