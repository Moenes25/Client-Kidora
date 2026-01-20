import { convertBackendToFrontend, CreateParentDto, Parent, UpdateParentDto } from "../../components/tables/Parents/types";
import { RoleUsers, StatutClient, User } from "../../types/auth.types";
import apiClient from "./axiosConfig";

export const parentApi = {



    getAllParents: async (): Promise<Parent[]> => {
        try {
        const response = await apiClient.get<User[]>('/client/parents');
        const users : User[] = response.data;
        return users.map(convertBackendToFrontend);
        } catch (error: any) {
        throw new Error(error.message || 'Erreur lors de la récupération des parents');
        }
    },

    createParent: async (parentData: CreateParentDto, imageFile?: File): Promise<User> => {
        try {
        const formData = new FormData();
        
        // Préparer les données pour correspondre à votre DTO backend
        // const prtData = {
        //     nom: parentData.nom,
        //     prenom: parentData.prenom,
        //     email: parentData.email,
        //     password: parentData.password,
        //     numTel: parentData.numTel || '', 
        //     role: RoleUsers.PARENT,  // ⭐ Ajouter le rôle
        //     statutClient: parentData.statutClient || StatutClient.ACTIF,
        //     profession: parentData.profession || '',
        //     relation: parentData.relation || '',
        // };
        
        // formData.append('user', JSON.stringify(prtData));
        
        formData.append('nom', parentData.nom);
        formData.append('prenom', parentData.prenom);
        formData.append('email', parentData.email);
        formData.append('password', parentData.password);
        formData.append('role', RoleUsers.PARENT);


        
        // Paramètres optionnels
        if (parentData.numTel) formData.append('numTel', parentData.numTel);
        if (parentData.profession) formData.append('profession', parentData.profession);
        if (parentData.relation) formData.append('relation', parentData.relation);
        if (parentData.statutClient) formData.append('statutClient', parentData.statutClient);
        
        if (imageFile) {
            formData.append('image', imageFile);
        }
        
        const response = await apiClient.post<User>('/client/register', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
        } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Erreur lors de la création du parent";
        throw new Error(errorMessage);
        }
    },


    updateParent: async (id: string, updateData: UpdateParentDto, imageFile?: File): Promise<User> => {

        try {
            const formData = new FormData();
            
            // Ajouter chaque champ individuellement (comme dans votre backend)
            // Object.entries(updateData).forEach(([key, value]) => {
            //     if (value !== undefined && value !== null && value !== '') {
            //     formData.append(key, value.toString());
            //     }
            // });
            if(updateData.nom) formData.append('nom', updateData.nom);
            if(updateData.prenom) formData.append('prenom', updateData.prenom);
            if(updateData.numTel) formData.append('numTel', updateData.numTel);
            if(updateData.profession) formData.append('profession', updateData.profession);
            if(updateData.relation) formData.append('relation', updateData.relation);
            if(updateData.statutClient) formData.append('statutClient', updateData.statutClient);
            
            if (imageFile) {
                formData.append('imageFile', imageFile);
            }
            
            const response = await apiClient.put<User>(`/client/update-client/${id}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Erreur lors de la mise à jour du parent';
            throw new Error(errorMessage);
            }
        },

    deleteParent: async (id: string): Promise<void> => {
        try {
          await apiClient.delete(`/client/delete-client/${id}`);
        } catch (error: any) {
          throw new Error(error.message || "Erreur lors de la suppression du parent");
        }
    },

    getParentById: async (id: string): Promise<User> => {
        try {
         const response = await apiClient.get<User>(`/client/${id}`);
         return response.data;
        } catch (error: any) {
         throw new Error(error.message || 'Erreur lors de la récupération du parent');
        }
    },
    
}