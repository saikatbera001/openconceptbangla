import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check local storage for initial user session
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('ocb_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('ocb_bookmarks');
      return saved ? JSON.parse(saved) : ["post-1", "post-4"];
    } catch {
      return ["post-1", "post-4"];
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('ocb_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ocb_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ocb_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Demo Login functionality (supports both admin & user simulation)
  const login = (email, password) => {
    if (email === 'admin@openconceptbangla.com' || email.includes('admin')) {
      const adminUser = {
        id: 'admin-1',
        name: 'অ্যাডমিন ম্যানেজার',
        email,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
      };
      setUser(adminUser);
      return { success: true, user: adminUser };
    } else {
      const regularUser = {
        id: 'user-' + Date.now(),
        name: email.split('@')[0],
        email,
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
      };
      setUser(regularUser);
      return { success: true, user: regularUser };
    }
  };

  const register = (name, email, password) => {
    const newUser = {
      id: 'user-' + Date.now(),
      name,
      email,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const toggleBookmark = (postId) => {
    setBookmarks(prev => {
      if (prev.includes(postId)) {
        return prev.filter(id => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  const isBookmarked = (postId) => bookmarks.includes(postId);

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin: user?.role === 'admin',
      bookmarks,
      login,
      register,
      logout,
      toggleBookmark,
      isBookmarked
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
