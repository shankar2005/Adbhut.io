import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [authLoading, setAuthLoading] = useState(false);

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        user,
        authLoading
    }

    useEffect(() => {
        setAuthLoading(true);
        const cookies = new Cookies();
        const token = cookies.get('auth_token');
        console.log(token);
        if (token) {
            fetch('https://dev.nsnco.in/api/v1/auth/verify/', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ token })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === "success") {
                        setIsAuthenticated(true);
                        setUser(data.user);
                        setAuthLoading(false);
                    }
                })
                .catch(err => setAuthLoading(false));
        }
    }, [isAuthenticated])

    console.log(user, isAuthenticated);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;