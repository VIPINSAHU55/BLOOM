import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
