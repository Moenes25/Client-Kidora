import { RoleUsers, StatutClient } from "../../../types/auth.types";

export interface ParentInfo {
  nom: string;
  prenom: string;
  image: string;
}

export interface Enfant {
  id: string;
  nom: string;
  prenom: string;
  age: number;
  classe: string;
  imageUrl: string;
  parentId: string;
  statut: StatutClient;
  dateInscription: string;
  dernierAcces: string;
}

export interface EnfantFormData {
  nom?: string;
  prenom?: string;
  age?: number;
  classe?: string;
  image?: string;
  imageFile?: File;
  statut?: StatutClient;
  parentId?: string;

  
}

export interface EnfantBackend {
  idEnfant: string;
  nom: string;
  prenom: string;
  age: number;
  classe: string;
  imageUrl: string;
  parentId: string;
}

export interface EnfantFrontend {
  id: string;
  nom: string;
  prenom: string;
  age: number;
  classe: string;
  imageUrl: string;
  parentId: string;
  parent: {
    nom: string;
    prenom: string;
    imageUrl?: string;
  };
  statut: 'actif' | 'inactif' | 'en_attente';
  dateInscription: string;
  dernierAcces: string;
}

// Données des enfants (devraient venir d'une API en production)
export const enfantsData: Enfant[] = [
  // {
  //   id: "enfant-1",
  //   nom: "Martin",
  //   prenom: "Lucas",
  //   age: 4,
  //   classe: "Petite Section",
  //   image: "/images/3-4_ans/enfant_1.jpg",
  //   parent: {
  //     nom: "Martin",
  //     prenom: "Sophie",
  //     image: "/images/user/user-09.jpg"
  //   },
  //   statut: 'actif',
  //   dateInscription: "2024-01-15",
  //   dernierAcces: "2024-03-20"
  // },
  // {
  //   id: "enfant-2",
  //   nom: "Dubois",
  //   prenom: "Emma",
  //   age: 3,
  //   classe: "Toute Petite Section",
  //   image: "/images/3-4_ans/enfant_2.jpg",
  //   parent: {
  //     nom: "Dubois",
  //     prenom: "Thomas",
  //     image: "/images/user/user-17.jpg"
  //   },
  //   statut: 'actif',
  //   dateInscription: "2024-01-20",
  //   dernierAcces: "2024-03-19"
  // },
  // {
  //   id: "enfant-3",
  //   nom: "Lambert",
  //   prenom: "Hugo",
  //   age: 5,
  //   classe: "Moyenne Section",
  //   image: "/images/3-4_ans/enfant_3.jpg",
  //   parent: {
  //     nom: "Lambert",
  //     prenom: "Marie",
  //     image: "/images/user/user-12.jpg"
  //   },
  //   statut: 'en_attente',
  //   dateInscription: "2024-02-05",
  //   dernierAcces: "2024-02-05"
  // },
  // {
  //   id: "enfant-4",
  //   nom: "Petit",
  //   prenom: "Léa",
  //   age: 6,
  //   classe: "Grande Section",
  //   image: "/images/3-4_ans/enfant_4.jpg",
  //   parent: {
  //     nom: "Petit",
  //     prenom: "Jean",
  //     image: "/images/user/user-10.jpg"
  //   },
  //   statut: 'inactif',
  //   dateInscription: "2023-12-10",
  //   dernierAcces: "2024-01-15"
  // },
  // {
  //   id: "enfant-5",
  //   nom: "Bernard",
  //   prenom: "Nathan",
  //   age: 4,
  //   classe: "Petite Section",
  //   image: "/images/3-4_ans/enfant_5.jpg",
  //   parent: {
  //     nom: "Bernard",
  //     prenom: "Laura",
  //     image: "/images/user/user-21.jpg"
  //   },
  //   statut: 'actif',
  //   dateInscription: "2024-01-10",
  //   dernierAcces: "2024-03-21"
  // },
  // {
  //   id: "enfant-6",
  //   nom: "Moreau",
  //   prenom: "Chloé",
  //   age: 7,
  //   classe: "CP",
  //   image: "/images/3-4_ans/enfant_6.jpg",
  //   parent: {
  //     nom: "Moreau",
  //     prenom: "Pierre",
  //     image: "/images/user/user-25.jpg"
  //   },
  //   statut: 'actif',
  //   dateInscription: "2024-01-25",
  //   dernierAcces: "2024-03-20"
  // },
  // {
  //   id: "enfant-7",
  //   nom: "Leroy",
  //   prenom: "Mathis",
  //   age: 5,
  //   classe: "Moyenne Section",
  //   image: "/images/3-4_ans/enfant_7.jpg",
  //   parent: {
  //     nom: "Leroy",
  //     prenom: "Julie",
  //     image: "/images/user/user-33.jpg"
  //   },
  //   statut: 'en_attente',
  //   dateInscription: "2024-02-15",
  //   dernierAcces: "2024-02-15"
  // },
  // {
  //   id: "enfant-8",
  //   nom: "Blanc",
  //   prenom: "Zoé",
  //   age: 8,
  //   classe: "CE1",
  //   image: "/images/3-4_ans/enfant_8.jpg",
  //   parent: {
  //     nom: "Blanc",
  //     prenom: "Marc",
  //     image: "/images/user/user-27.jpg"
  //   },
  //   statut: 'inactif',
  //   dateInscription: "2023-11-30",
  //   dernierAcces: "2024-01-10"
  // },
];