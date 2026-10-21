import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('saree_store_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authRole, setAuthRole] = useState('CUSTOMER'); // 'CUSTOMER' or 'ADMIN'

  useEffect(() => {
    if (user) {
      localStorage.setItem('saree_store_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('saree_store_user');
    }
  }, [user]);

  const login = async (email, password, role = 'CUSTOMER') => {
    if (email === 'admin@sareevault.com' && password === 'admin123') {
      const adminUser = {
        id: 1,
        name: 'Store Admin',
        email: 'admin@sareevault.com',
        role: 'ADMIN',
        token: 'mock-jwt-admin-token'
      };
      setUser(adminUser);
      setIsAuthModalOpen(false);
      return { success: true, user: adminUser };
    }

    const customerUser = {
      id: Date.now(),
      name: email.split('@')[0] || 'Customer',
      email: email,
      role: role,
      phone: '9876543210',
      address: 'No. 12, Anna Nagar, Chennai - 600040',
      token: 'mock-jwt-customer-token'
    };
    setUser(customerUser);
    setIsAuthModalOpen(false);
    return { success: true, user: customerUser };
  };

  const register = async (name, email, password, phone, address, role = 'CUSTOMER') => {
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      phone: phone || '',
      address: address || '',
      role: role,
      token: 'mock-jwt-customer-token'
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const openAuth = (mode = 'login', role = 'CUSTOMER') => {
    setAuthMode(mode);
    setAuthRole(role);
    setIsAuthModalOpen(true);
  };

  const closeAuth = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin: user?.role === 'ADMIN',
      login,
      register,
      logout,
      isAuthModalOpen,
      authMode,
      authRole,
      setAuthMode,
      setAuthRole,
      openAuth,
      closeAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
