import React, { createContext, useContext, useState, useEffect } from 'react';
import { POSTS as initialPosts, CATEGORIES as initialCategories } from '../data/dummyData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [categories, setCategories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');

  // Urgent Notice State with localStorage persistence
  const [notice, setNotice] = useState(() => {
    try {
      const saved = localStorage.getItem('ocb_urgent_notice');
      return saved !== null
        ? saved
        : 'পশ্চিমবঙ্গ ও কেন্দ্রীয় সরকারি প্রকল্পের নতুন আবেদন প্রক্রিয়া শুরু হয়েছে। বিস্তারিত নির্দেশিকা পড়তে পোস্টগুলোতে ক্লিক করুন।';
    } catch {
      return 'পশ্চিমবঙ্গ ও কেন্দ্রীয় সরকারি প্রকল্পের নতুন আবেদন প্রক্রিয়া শুরু হয়েছে। বিস্তারিত নির্দেশিকা পড়তে পোস্টগুলোতে ক্লিক করুন।';
    }
  });

  const [noticeActive, setNoticeActive] = useState(() => {
    try {
      const saved = localStorage.getItem('ocb_urgent_active');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ocb_urgent_notice', notice);
    } catch {
      // ignore storage errors
    }
  }, [notice]);

  useEffect(() => {
    try {
      localStorage.setItem('ocb_urgent_active', JSON.stringify(noticeActive));
    } catch {
      // ignore storage errors
    }
  }, [noticeActive]);

  // Update Urgent Notice function
  const updateUrgentNotice = (newText, isActive = true) => {
    setNotice(newText);
    setNoticeActive(isActive);
    try {
      localStorage.setItem('ocb_urgent_notice', newText);
      localStorage.setItem('ocb_urgent_active', JSON.stringify(isActive));
    } catch {
      // ignore
    }
    return { success: true, notice: newText, active: isActive };
  };

  // Admin post actions (local state fallback before full backend sync)
  const addPost = (newPost) => {
    const postWithId = {
      ...newPost,
      id: 'post-' + Date.now(),
      slug: newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      views: 0,
      likes: 0,
      publishedDate: 'আজকে',
    };
    setPosts([postWithId, ...posts]);
    return postWithId;
  };

  const deletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const updatePost = (id, updatedFields) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        categories,
        searchQuery,
        setSearchQuery,
        notice,
        setNotice,
        noticeActive,
        setNoticeActive,
        updateUrgentNotice,
        addPost,
        deletePost,
        updatePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
