import React, { useEffect, useState } from 'react';
import PostForm from '../components/post/PostForm';
import PostList from '../components/post/PostList';
import { Post } from '../types/Post';
import { getAllPosts } from '../api/index';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCapIcon, BookOpenIcon, UsersIcon } from 'lucide-react';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleAddPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleAddComment = (postId: string, comment: any) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, comment] } : post));
  };

  const handleUpdateComment = (postId: string, commentId: string, content: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => comment.id === commentId ? { ...comment, content } : comment)
        };
      }
      return post;
    }));
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: post.comments.filter(comment => comment.id !== commentId) };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to LearnShare</h1>
        <p className="text-blue-100 mb-4">Share your knowledge, learn from others, and grow together.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center space-x-3 bg-blue-500/30 rounded-lg p-3">
            <GraduationCapIcon size={24} />
            <div>
              <h3 className="font-semibold">Learn</h3>
              <p className="text-sm text-blue-100">Access quality tutorials</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-blue-500/30 rounded-lg p-3">
            <BookOpenIcon size={24} />
            <div>
              <h3 className="font-semibold">Share</h3>
              <p className="text-sm text-blue-100">Create and share content</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-blue-500/30 rounded-lg p-3">
            <UsersIcon size={24} />
            <div>
              <h3 className="font-semibold">Connect</h3>
              <p className="text-sm text-blue-100">Engage with learners</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <PostForm onAddPost={handleAddPost} />
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Learning Feed</h2>
        </div>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <PostList
            posts={posts}
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
          />
        )}
      </div>
    </div>
  );
};

export default Home;