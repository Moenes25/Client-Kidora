import { RoleUsers, StatutClient, User } from "../../../types/auth.types";

export interface Parent {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  relation: string;
  enfants: {
    images: string[];
  };
  statut: string;
  profession: string;
  image: string;
}
export enum Relation {
  MERE = "Mère",
  PERE = "Père",
}
export interface CreateParentDto {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  profession?: string;
  relation?: string;
  numTel?: string;
  adresse?: string;
  role: RoleUsers.PARENT;
  statutClient?: StatutClient;
  imageUrl?: string;
}


export interface UpdateParentDto {
  nom?: string;
  prenom?: string;
  profession?: string;
  relation?: string;
  numTel?: string;
  adresse?: string;
  statutClient?: StatutClient;
}

export interface BackendParent {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  profession: string;
  relation: string;
  numTel : string;
  adresse?: string;
  role: RoleUsers.PARENT;
  statutClient:StatutClient;
  imageUrl?: string;
  enfants: any[];
  createdAt?: string;
  updatedAt?: string;
}


export const convertBackendToFrontend = (user: User) : Parent => {
 return {
    id: user.id, 
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    telephone: user.numTel,
    relation: user.relation || 'Non spécifié',
    statut: user.statutClient,
    profession: user.profession || 'Non spécifié',
    image: user.imageUrl || '/images/user/default-avatar.jpg',
    enfants: {
      images: user.enfants?.map((enfant: any) => enfant.imageUrl) || []
    }
  };
}
export const tableData: Parent[] = [
  {
    id: "parent1",
    nom : "Sophie",
    prenom: "Martin",
    email: "sophie.martin@email.com",
    telephone: "+33 6 12 34 56 78",
    relation: "Mère",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_1.jpg",
        "/images/3-4_ans/enfant_10.jpg",
        "/images/3-4_ans/enfant_13.jpg",
      ]
    },
    statut: "Actif",
    profession: "Enseignante",
    image: "/images/user/user-09.jpg"
  },
  {
    id: "parent2",
    // nomPrenom: "Thomas Dubois",
    nom: "Thomas",
    prenom: "Dubois",
    email: "thomas.dubois@email.com",
    telephone: "+33 6 23 45 67 89",
    relation: "Père",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_1.jpg",
        "/images/3-4_ans/enfant_2.jpg",
        "/images/3-4_ans/enfant_3.jpg",
        "/images/3-4_ans/enfant_4.jpg",
        "/images/3-4_ans/enfant_5.jpg",
      ]
    },
    statut: "Actif",
    profession: "Ingénieur",
    image: "/images/user/user-17.jpg"
  },
  {
    id: "parent3",
    // nomPrenom: "Marie Lambert",
    nom: "Marie",
    prenom: "Lambert",
    email: "marie.lambert@email.com",
    telephone: "+33 6 34 56 78 90",
    relation: "Mère",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_9.jpg",
        "/images/3-4_ans/enfant_12.jpg",
        "/images/3-4_ans/enfant_11.jpg",
      ]
    },
    statut: "En attente",
    profession: "Médecin",
    image: "/images/user/user-12.jpg"
  },
  {
    id: "parent4",
    // nomPrenom: "Jean Petit",
    nom: "Jean",
    prenom: "Petit",
    email: "jean.petit@email.com",
    telephone: "+33 6 45 67 89 01",
    relation: "Père",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_4.jpg",
        "/images/3-4_ans/enfant_5.jpg",
        "/images/3-4_ans/enfant_6.jpg",
        "/images/3-4_ans/enfant_7.jpg",
      ]
    },
    statut: "Inactif",
    profession: "Architecte",
    image: "/images/user/user-10.jpg"
  },
  {
    id: "parent5",
    // nomPrenom: "Laura Bernard",
    nom: "Laura",
    prenom: "Bernard",
    email: "laura.bernard@email.com",
    telephone: "+33 6 56 78 90 12",
    relation: "Mère",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_1.jpg",
        "/images/3-4_ans/enfant_2.jpg",
        "/images/3-4_ans/enfant_3.jpg",
      ]
    },
    statut: "Actif",
    profession: "Avocate",
    image: "/images/user/user-21.jpg"
  },
  {
    id: "parent6",
    // nomPrenom: "Pierre Moreau",
    nom: "Pierre",
    prenom: "Moreau",
    email: "pierre.moreau@email.com",
    telephone: "+33 6 67 89 01 23",
    relation: "Père",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_10.jpg",
        "/images/3-4_ans/enfant_11.jpg",
      ]
    },
    statut: "Actif",
    profession: "Commercial",
    image: "/images/user/user-25.jpg"
  },
  {
    id: "parent7",
    // nomPrenom: "Julie Leroy",
    nom: "Julie",
    prenom: "Leroy",
    email: "julie.leroy@email.com",
    telephone: "+33 6 78 90 12 34",
    relation: "Mère",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_1.jpg",
        "/images/3-4_ans/enfant_2.jpg",
        "/images/3-4_ans/enfant_3.jpg",
      ]
    },
    statut: "En attente",
    profession: "Infirmière",
    image: "/images/user/user-33.jpg"
  },
  {
    id: "parent8",
    // nomPrenom: "Marc Blanc",
    nom: "Marc",
    prenom: "Blanc",
    email: "marc.blanc@email.com",
    telephone: "+33 6 89 01 23 45",
    relation: "Père",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_16.jpg"
      ]
    },
    statut: "Actif",
    profession: "Chef de projet",
    image: "/images/user/user-27.jpg"
  }
];
