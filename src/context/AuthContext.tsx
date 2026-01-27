import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { authApi } from '../services/api/authApi';
import {
    LoginCredentials,
    User,
    AuthState,
    AuthContextType,
    RoleUsers,
    StatutClient,
    userData
} from '../types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider : React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        let user: User | null = null;
        if( userStr) {
            try{
                user = JSON.parse(userStr);
               
            } catch (error) {
                console.error('Erreur lors de la conversion de la chaine de caractères en objet JSON:', error);
                localStorage.removeItem('user');
            }
        }
        return {
            user,
            token,
            isLoading: false,
            error: null,
            isAuthenticated: !!token && !!user,
        };
    });
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
            try {
                 const user = JSON.parse(userStr);
                const payload = JSON.parse(atob(token.split('.')[1]));
                const isExpired = payload.exp * 1000 < Date.now();
                if (!isExpired) {
                    setAuthState((prev) => ({
                        ...prev,
                        user,
                        isAuthenticated: true,
                    }));
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                   
                }
            }
            catch (error) {
                console.error('Erreur lors de la vérification:', error)
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
         }, []);

        const login = async (credentials: LoginCredentials): Promise<userData> => {
            setAuthState(prev => ({...prev, isLoading: true, error: null}));
            try {
                const response = await authApi.login(credentials);
                localStorage.setItem('token', response.token);

                const userFormToken  = response.user 
                localStorage.setItem('user', JSON.stringify(userFormToken));

                const user : User  = {
                        id : userFormToken.id || "",
                        nom : "",
                        prenom : "",
                        email : userFormToken.email,
                        role : userFormToken.role,
                        statutClient : StatutClient.ACTIF,
                        numTel : "",
                        adresse : "",
                        profession : "",
                        relation : "",
                        specialisation : "",
                        experience :  0,
                        disponibilite :  "",
                        classe : "",
                       imageUrl: undefined,
                        createdAt :  "",
                        updatedAt : ""
                    };
                  console.log("imageUrl =", user?.imageUrl);

                setAuthState({
                   user,
                   token: response.token,
                   isLoading: false,
                   error: null,
                   isAuthenticated: true,
                });

                const userDt : userData = {
                        id : userFormToken.id || "",
                        email : userFormToken.email,
                        role : userFormToken.role,
                    };
                console.log("userDt",userDt);
                 return userDt;
                } catch (error:any) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setAuthState(prev => ({
                        ...prev,
                        isLoading: false,
                        error: error.message || 'Erreur de connexion',
                        isAuthenticated: false,
                    }));
                    throw error;
                }
            };
             const logout = (): void => {
                authApi.logout().catch(error => {
                console.warn('Erreur lors de la déconnexion API:', error);
                });
            
            localStorage.removeItem('token');
            localStorage.removeItem('user');
    
    
            setAuthState({
            user: null,
            token: null,
            isLoading: false,
            error: null,
            isAuthenticated: false,
            });
        };
         const clearError = (): void => {
            setAuthState(prev => ({ ...prev, error: null }));
        };

        const contextValue: AuthContextType = {
            ...authState,
            login,
            logout,
            clearError,
        };

        return (
            <AuthContext.Provider value={contextValue}>
                {children}
            </AuthContext.Provider>
        );
                
    }