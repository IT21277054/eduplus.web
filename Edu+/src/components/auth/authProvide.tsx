import React, { createContext, useEffect, useState } from 'react';

const defaultValue = {
  user: null,
  isLoading: false,
  login: (userData: any) => {},
  logout: () => {}
};
export const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }:any) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Stored user:', storedUser);

    const fetchUserData = async () => {
      setIsLoading(true);

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  const login = (userData:any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('User logged in:', userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('User logged out');
  };

  console.log('Current user:', user);
  console.log('Is loading:', isLoading);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
