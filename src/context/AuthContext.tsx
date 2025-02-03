import React, { createContext, useContext, useState, useEffect } from "react";
import { authenticateUser } from '@/api/apiService';

interface AuthContextProps {
    isAuthenticated: boolean | undefined;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsAuthenticated(!!token);
    }, []); ""

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const data = await authenticateUser(username, password);

            if (data && data.apiKey) {
                localStorage.setItem("authToken", data.apiKey);
                localStorage.setItem("email", data.user.email);
                localStorage.setItem("name", data.user.name);
                localStorage.setItem("username", data.user.username);

                setIsAuthenticated(true);
                return true;
            }
        } catch (error) {
            console.error("Erro na autenticação:", error);
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Problema ao efetuar LogIn com AuthProvider");
    }
    return context;
};
