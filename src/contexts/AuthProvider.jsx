import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const value = {
        isAuthenticated,
        setIsAuthenticated
    }

    useEffect(() => {
        const cookies = new Cookies();
        if (cookies.get('auth_token')) {
            setIsAuthenticated(true);
        }
    })

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;