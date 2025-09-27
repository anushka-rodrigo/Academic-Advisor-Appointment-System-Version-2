import React from 'react'
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem('token');

    if (!token) {
        toast.error('You must be logged in to access this page.');
        setTimeout(() => {
            window.location.href = '/login';
        }, 1500);
        return null;
    }

    return children;
    
}

export default ProtectedRoute;