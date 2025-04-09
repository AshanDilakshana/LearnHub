import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { uploadVideo, getVideosByPostId } from '../api';

function VideoUpload({ postId, userId }) {
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    getVideosByPostId(postId).then((res) => setVideos(res.data));
  }, [postId]);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('postId', postId);
    formData.append('userId', userId);
    uploadVideo(formData).then((res) => {
      setVideos([...videos, res.data]);
    });
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button onClick={handleUpload}>Upload Video</Button>
      {videos.map((video) => (
        <div key={video.id}>
          <video src={video.videoUrl} controls />
        </div>
      ))}
    </div>
  );
}

export default VideoUpload;