import { RoleUsers, StatutClient, User } from "../../../types/auth.types";

export interface Utilisateur {
  id: string;
  nomPrenom: string;
  email: string;
  telephone: string | undefined;
  role: RoleUsers;
  statut: StatutClient;
  dateCreation: string;
  derniereConnexion: string;
  image: string;
  enfants?: {
    images: string[];
  };
  classe?: string;
}

export interface UserFormData {
  nomPrenom?: string;
  email?: string;
  telephone?: string;
  role?: RoleUsers;
  statut?: StatutClient;
  image?: string;
  classe?: string;
}

export interface UserFormErrors {
  nomPrenom?: string;
  email?: string;
  telephone?: string;
}
export const converUserToUtilisateur = (user: User):Utilisateur => {
  return {
    id: user.id,
    nomPrenom: user.nom + " " + user.prenom,
    email: user.email,
    telephone: user.numTel,
    role: user.role ,
    statut: user.statutClient,
    image: user.imageUrl || '/images/user/default-avatar.jpg',
    classe: user.classe || '',
    dateCreation: new Date().toISOString().split('T')[0], 
    derniereConnexion: new Date().toISOString().split('T')[0], 
  };
}
export const tableData: Utilisateur[] = [
  {
    id: "user1",
    nomPrenom: "Sophie Martin",
    email: "sophie.martin@email.com",
    telephone: "+33 6 12 34 56 78",
    role: RoleUsers.PARENT,
    statut: StatutClient.ACTIF,
    dateCreation: "2024-01-15",
    derniereConnexion: "2024-03-20",
    image: "/images/user/user-09.jpg",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_1.jpg",
        "/images/3-4_ans/enfant_2.jpg",
      ]
    }
  },
  {
    id: "user2",
    nomPrenom: "Thomas Dubois",
    email: "thomas.dubois@email.com",
    telephone: "+33 6 23 45 67 89",
    role: RoleUsers.PARENT,
    statut: StatutClient.ACTIF,
    dateCreation: "2024-01-20",
    derniereConnexion: "2024-03-19",
    image: "/images/user/user-17.jpg",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_3.jpg",
      ]
    }
  },
  {
    id: "user3",
    nomPrenom: "Marie Lambert",
    email: "marie.lambert@email.com",
    telephone: "+33 6 34 56 78 90",
    role: RoleUsers.PARENT,
    statut: StatutClient.EN_ATTENTE,
    dateCreation: "2024-02-05",
    derniereConnexion: "2024-02-05",
    image: "/images/user/user-12.jpg",
    enfants: {
      images: []
    }
  },
  {
    id: "user4",
    nomPrenom: "Jean Petit",
    email: "jean.petit@email.com",
    telephone: "+33 6 45 67 89 01",
    role: RoleUsers.PARENT,
    statut: StatutClient.INACTIF,
    dateCreation: "2023-12-10",
    derniereConnexion: "2024-01-15",
    image: "/images/user/user-10.jpg",
    enfants: {
      images: [
        "/images/3-4_ans/enfant_4.jpg",
        "/images/3-4_ans/enfant_5.jpg",
        "/images/3-4_ans/enfant_6.jpg",
      ]
    }
  },
  {
    id: "user5",
    nomPrenom: "Laura Bernard",
    email: "laura.bernard@email.com",
    telephone: "+33 6 56 78 90 12",
    role: RoleUsers.EDUCATEUR,
    statut: StatutClient.ACTIF,
    dateCreation: "2024-01-10",
    derniereConnexion: "2024-03-21",
    image: "/images/user/user-21.jpg",
    classe: "(3-4) ans"
  },
  {
    id: "user6",
    nomPrenom: "Pierre Moreau",
    email: "pierre.moreau@email.com",
    telephone: "+33 6 67 89 01 23",
    role: RoleUsers.EDUCATEUR,
    statut: StatutClient.ACTIF,
    dateCreation: "2024-01-25",
    derniereConnexion: "2024-03-20",
    image: "/images/user/user-25.jpg",
    classe: "(6-7) ans"
  },
  {
    id: "user7",
    nomPrenom: "Julie Leroy",
    email: "julie.leroy@email.com",
    telephone: "+33 6 78 90 12 34",
    role: RoleUsers.EDUCATEUR,
    statut: StatutClient.EN_ATTENTE,
    dateCreation: "2024-02-15",
    derniereConnexion: "2024-02-15",
    image: "/images/user/user-33.jpg",
    classe: "(4-5) ans"
  },
  {
    id: "user8",
    nomPrenom: "Marc Blanc",
    email: "marc.blanc@email.com",
    telephone: "+33 6 89 01 23 45",
    role: RoleUsers.EDUCATEUR,
    statut: StatutClient.INACTIF,
    dateCreation: "2023-11-30",
    derniereConnexion: "2024-01-10",
    image: "/images/user/user-27.jpg",
    classe: "(8-9) ans"
  }
];