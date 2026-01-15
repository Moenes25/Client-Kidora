export enum RoleUsers{
  PARENT = 'PARENT',
  EDUCATEUR = 'EDUCATEUR',
  ADMIN = 'ADMIN'
}

export enum StatutClient {
  ACTIF = 'ACTIF',
  INACTIF = 'INACTIF',
  EN_ATTENTE = 'EN_ATTENTE',
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: 'Bearer';
}
export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: RoleUsers;
  statutClient: StatutClient;
  numTel?: string;
  adresse?: string;
  profession?: string;
  relation?: string;
  specialisation?: string;
  experience?: number;
  disponibilite?: string;
  classe?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  enfants: any[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
export interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<userData>;
  logout: () => void;
  clearError: () => void;
}

export interface userData {
  id: string;
  email: string;
  role: RoleUsers;
}