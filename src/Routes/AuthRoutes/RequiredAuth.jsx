import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const RequiredAuth = ({ children }) => {
    const { isAuthenticated, authLoading } = useContext(AuthContext);

    if (authLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />
    }

    return children;
};

export default RequiredAuth;