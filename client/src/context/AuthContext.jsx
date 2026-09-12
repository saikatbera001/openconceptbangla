import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4500/api';

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

  const [token, setToken] = useState(() => {
    return localStorage.getItem('ocb_token') || null;
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('ocb_bookmarks');
      return saved ? JSON.parse(saved) : ['post-1', 'post-4'];
    } catch {
      return ['post-1', 'post-4'];
    }
  });

  // Portal & Admin Settings
  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('ocb_site_settings');
      return saved
        ? JSON.parse(saved)
        : {
            siteName: 'Open Concept Bangla',
            siteTagline: 'বাংলা ভাষায় নির্ভরযোগ্য সরকারি তথ্য ও প্রযুক্তি পোর্টাল',
            noticeText: 'পশ্চিমবঙ্গ সরকারের সকল প্রকল্পের সর্বশেষ তথ্য ও আবেদনের নির্দেশিকা এখানে নিয়মিত হালনাগাদ করা হয়।',
            noticeActive: true,
            allowOtpLogin: true,
            allowRegistration: true,
            requireEmailVerification: true,
            supportEmail: 'contact@openconceptbangla.com',
            supportPhone: '+91 98765 43210',
            whatsappLink: 'https://wa.me/919876543210',
            facebookLink: 'https://facebook.com/openconceptbangla',
            maintenanceMode: false,
          };
    } catch {
      return {
        siteName: 'Open Concept Bangla',
        siteTagline: 'বাংলা ভাষায় নির্ভরযোগ্য সরকারি তথ্য ও প্রযুক্তি পোর্টাল',
        noticeText: 'পশ্চিমবঙ্গ সরকারের সকল প্রকল্পের সর্বশেষ তথ্য ও আবেদনের নির্দেশিকা এখানে নিয়মিত হালনাগাদ করা হয়।',
        noticeActive: true,
        allowOtpLogin: true,
        allowRegistration: true,
        requireEmailVerification: true,
        supportEmail: 'contact@openconceptbangla.com',
        supportPhone: '+91 98765 43210',
        whatsappLink: 'https://wa.me/919876543210',
        facebookLink: 'https://facebook.com/openconceptbangla',
        maintenanceMode: false,
      };
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
    if (token) {
      localStorage.setItem('ocb_token', token);
    } else {
      localStorage.removeItem('ocb_token');
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('ocb_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('ocb_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Standard Login (Password)
  const login = async (email, password) => {
    // 1-Click Demo Admin Fast Bypass
    if (email === 'admin@openconceptbangla.com' && password === 'admin12345') {
      const demoAdmin = {
        id: 'admin-1',
        name: 'অ্যাডমিন ম্যানেজার',
        email,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        isEmailVerified: true,
      };
      setUser(demoAdmin);
      return { success: true, user: demoAdmin };
    }

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        if (data.token) setToken(data.token);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'লগইন ব্যর্থ হয়েছে।' };
      }
    } catch {
      // Fallback for offline demo
      const fallbackUser = {
        id: 'user-' + Date.now(),
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' : 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      };
      setUser(fallbackUser);
      return { success: true, user: fallbackUser };
    }
  };

  // Passwordless Login with Email OTP
  const loginWithOtp = async (email, otp) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        if (data.token) setToken(data.token);
        return { success: true, user: data.user };
      }
      return { success: false, message: data.message || 'ভুল ওটিপি কোড।' };
    } catch {
      return { success: false, message: 'সার্ভারে সংযোগ করা যায়নি।' };
    }
  };

  // Standard Register
  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        if (data.token) setToken(data.token);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'নিবন্ধন ব্যর্থ হয়েছে।' };
      }
    } catch {
      const newUser = {
        id: 'user-' + Date.now(),
        name,
        email,
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      };
      setUser(newUser);
      return { success: true, user: newUser };
    }
  };

  // Register with verified Email OTP
  const registerWithOtp = async (name, email, password, otp) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register-with-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, otp }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        if (data.token) setToken(data.token);
        return { success: true, user: data.user, message: data.message };
      }
      return { success: false, message: data.message || 'ওটিপি যাচাই বা নিবন্ধন ব্যর্থ হয়েছে।' };
    } catch {
      return { success: false, message: 'সার্ভার সংযোগ সমস্যা।' };
    }
  };

  // Send OTP to Email
  const sendOtp = async (email, purpose = 'email_verification') => {
    try {
      const res = await fetch(`${API_BASE}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose }),
      });
      const data = await res.json();
      return data;
    } catch {
      return { success: false, message: 'ওটিপি পাঠাতে সমস্যা হয়েছে।' };
    }
  };

  // Verify OTP
  const verifyOtp = async (email, otp, purpose = 'email_verification') => {
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, purpose }),
      });
      const data = await res.json();
      return data;
    } catch {
      return { success: false, message: 'ওটিপি যাচাই করতে সমস্যা হয়েছে।' };
    }
  };

  // Request Forgot Password OTP
  const forgotPassword = async (email) => {
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return data;
    } catch {
      return { success: false, message: 'পাসওয়ার্ড রিসেট ওটিপি পাঠাতে ব্যর্থ হয়েছে।' };
    }
  };

  // Reset Password with OTP
  const resetPassword = async (email, otp, newPassword) => {
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      return data;
    } catch {
      return { success: false, message: 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে।' };
    }
  };

  // Update Profile Info (Name, Avatar, Password, etc.)
  const updateProfile = async (updatedFields) => {
    if (!user) return { success: false, message: 'কোনো লগইন সেশন পাওয়া যায়নি।' };

    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    localStorage.setItem('ocb_user', JSON.stringify(updatedUser));

    if (token) {
      try {
        const res = await fetch(`${API_BASE}/auth/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFields),
        });
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
          localStorage.setItem('ocb_user', JSON.stringify(data.user));
          return { success: true, user: data.user, message: data.message };
        }
      } catch {
        // Local state updated anyway
      }
    }

    return { success: true, user: updatedUser, message: 'প্রোফাইল আপডেট হয়েছে।' };
  };

  // 1-Click Role Switcher (User <-> Admin)
  const toggleAdminRole = async () => {
    if (!user) return { success: false };
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    return updateProfile({ role: newRole });
  };

  // Update Portal/Site Settings
  const updateSiteSettings = (newSettings) => {
    setSiteSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('ocb_site_settings', JSON.stringify(updated));
      return updated;
    });
    return { success: true, message: 'সাইট সেটিংস সফলভাবে সংরক্ষিত হয়েছে।' };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ocb_user');
    localStorage.removeItem('ocb_token');
  };

  const toggleBookmark = (postId) => {
    setBookmarks((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  const isBookmarked = (postId) => bookmarks.includes(postId);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin: user?.role === 'admin',
        bookmarks,
        siteSettings,
        login,
        loginWithOtp,
        register,
        registerWithOtp,
        sendOtp,
        verifyOtp,
        forgotPassword,
        resetPassword,
        updateProfile,
        toggleAdminRole,
        updateSiteSettings,
        logout,
        toggleBookmark,
        isBookmarked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
