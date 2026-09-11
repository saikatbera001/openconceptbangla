import React, { createContext, useContext, useState } from 'react';
import { POSTS as initialPosts, CATEGORIES as initialCategories } from '../data/dummyData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [categories, setCategories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [notice, setNotice] = useState('পশ্চিমবঙ্গ ও কেন্দ্রীয় সরকারি প্রকল্পের নতুন আবেদন প্রক্রিয়া শুরু হয়েছে। বিস্তারিত নির্দেশিকা পড়তে পোস্টগুলোতে ক্লিক করুন।');

  // Admin post actions (local state fallback before full backend sync)
  const addPost = (newPost) => {
    const postWithId = {
      ...newPost,
      id: 'post-' + Date.now(),
      slug: newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      views: 0,
      likes: 0,
      publishedDate: 'আজকে'
    };
    setPosts([postWithId, ...posts]);
    return postWithId;
  };

  const deletePost = (id) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const updatePost = (id, updatedFields) => {
    setPosts(posts.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  return (
    <AppContext.Provider value={{
      posts,
      categories,
      searchQuery,
      setSearchQuery,
      notice,
      setNotice,
      addPost,
      deletePost,
      updatePost
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
