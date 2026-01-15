import apiClient from './axiosConfig';
import {LoginCredentials,LoginResponse,User, userData} from '../../types/auth.types';
import axios from 'axios';

const decodeJwt = (token: string): any => {
    try {
        const base64URL = token.split('.')[1];
        const base64 = base64URL.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
            );
            return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
    }
};
export const authApi = {
 login : async (credentials: LoginCredentials):Promise<LoginResponse & {user  : userData}> => {
    try {
        const response = await apiClient.post<LoginResponse>('/client/login', credentials);
        const decode = decodeJwt(response.data.token);
        

        const user : userData = {
                id : decode.id,
                role : decode.role,
                email : decode.username
            };
            localStorage.setItem('user', JSON.stringify(user));
           
        return {...response.data,user};
    
    } catch (error:any) {
    throw new Error(error.message || "Erreur de connexion");
 } 
 },

 

 logout : async () : Promise<void> => {
    try {
      await apiClient.post('/client/logout');
    } catch (error) {
    console.warn('Erreur lors de la déconnexion:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
},
getAllUsers : async () : Promise<User[]> => {
    try {
      const response = await apiClient.get<User[]>('/client/all');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de la récupération des utilisateurs');
    }
  },

  deleteUser : async (id: string) : Promise<void> => {
    try {
      await apiClient.delete(`/client/delete-client/${id}`);
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la suppression de l'utilisateur");
    }
  },

  getImage: async (imagePath: string): Promise<Blob> => {
    try {
      const token = localStorage.getItem('token');
      
      // IMPORTANT: Créez une instance axios séparée sans le /api
      const imageClient = axios.create({
        baseURL: 'http://localhost:8086', // Pas de /api ici
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const response = await imageClient.get(imagePath);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors du chargement de l\'image');
    }
  },

  getImageUrl: (imagePath: string): string => {
    const token = localStorage.getItem('token');
    const baseURL = 'http://localhost:8086';
    
    if (!token) {
      return '/images/default-avatar.jpg';
    }
    
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${baseURL}${cleanPath}?token=${encodeURIComponent(token)}`;
  }

}