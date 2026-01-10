import apiClient from './axiosConfig';
import {LoginCredentials,LoginResponse,User, userData} from '../../types/auth.types';

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

}