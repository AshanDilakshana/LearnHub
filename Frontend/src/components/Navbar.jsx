import { AppBar, Toolbar, IconButton } from '@mui/material';
import { Home, VideoLibrary, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const userId = "user-id"; // Replace with actual user ID from auth

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={() => navigate('/')}>
          <Home />
        </IconButton>
        <IconButton onClick={() => navigate('/video')}>
          <VideoLibrary />
        </IconButton>
        <IconButton onClick={() => navigate(`/profile/${userId}`)}>
          <Person />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;