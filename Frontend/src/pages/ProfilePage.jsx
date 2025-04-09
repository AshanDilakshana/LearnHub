import { useParams } from 'react-router-dom';
import Profile from '../components/Profile';

function ProfilePage() {
  const { id } = useParams();
  return <Profile userId={id} />;
}

export default ProfilePage;