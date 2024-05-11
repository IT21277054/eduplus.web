import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authProvide';
import { jwtDecode } from "jwt-decode";

export const AdminGuard = ({ children}:any) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user) {
    
    const decode = jwtDecode(user);

    if(decode.role === 'ADMIN'){
      return <>{children}</>;
    }

    if(decode.role === 'INSTRUCTOR'){
      return <Navigate to="/instructor" replace />;
    }

    if(decode.role === 'LEARNER'){
      return <Navigate to="/user" replace />;
    }
  }

  return <Navigate to="/" replace />;
};

export const InstructorGuard = ({ children}:any) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user) {
    
    const decode = jwtDecode(user);

    if(decode.role === 'ADMIN'){
      return <Navigate to="/admin/dashboard" replace />;
    }

    if(decode.role === 'INSTRUCTOR'){
      return <>{children}</>;
    }

    if(decode.role === 'LEARNER'){
      return <Navigate to="/user" replace />;
    }
  }

  return <Navigate to="/" replace />;
};

export const LearnerGuard = ({ children}:any) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user) {
    
    const decode = jwtDecode(user);

    if(decode.role === 'ADMIN'){
      return <Navigate to="/admin/dashboard" replace />;
    }

    if(decode.role === 'INSTRUCTOR'){
      return <Navigate to="/instructor" replace />;
    }

    if(decode.role === 'LEARNER'){
      return <>{children}</>;
    }
  }

  return <Navigate to="/" replace />;
};

export const GuestGuard = ({ children }:any) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  
  if (user) {

    const decode = jwtDecode(user);

    if(decode.role === 'ADMIN'){
      return <Navigate to="/admin/dashboard" replace />;
    }

    if(decode.role === 'INSTRUCTOR'){
      return <Navigate to="/instructor" replace />;
    }

    if(decode.role === 'LEARNER'){
      return <Navigate to="/user" replace />;
    }
    
  }

  return <>{children}</>;
};
