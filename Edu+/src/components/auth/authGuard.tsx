import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authProvide';

export const PrivateGuard = ({ children}:any) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
};

export const GuestGuard = ({ children }:any) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/user" replace />;
  }

  return <>{children}</>;
};
