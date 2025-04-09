import { useParams } from 'react-router-dom';
import VideoUpload from '../components/VideoUpload';

function VideoPage() {
  const { postId } = useParams();
  const userId = "user-id"; // Replace with actual user ID
  return <VideoUpload postId={postId} userId={userId} />;
}

export default VideoPage;