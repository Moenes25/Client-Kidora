import { RoleUsers, StatutClient, User } from "../../../types/auth.types";

export interface Educateur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  numTel: string;
  image: string;
  specialite: string;
  experience: number;
  disponibilite: string;
  classes: string[];
  dateEmbauche: string;
  statut: string;
}

export interface CreateEducateurDto {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  specialisation?: string;
  experience?: number;
  disponibilite?: string;
  classe?: string;
  numTel?: string;
  adresse?: string;
  role: RoleUsers.EDUCATEUR;
  statutClient?: StatutClient;
}

export interface UpdateEducateurDto {
  nom?: string;
  prenom?: string;
  specialisation?: string;
  experience?: number;
  disponibilite?: string;
  classe?: string;
  numTel?: string;
  adresse?: string;
  statutClient: StatutClient;
}



export const convertBackendToEducateur = (user: User): Educateur => {
  return {
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    numTel: user.numTel || '',
    image: user.imageUrl || '/uploads/users/default-avatar-educateur.jpg',
    specialite: user.specialisation || 'Non spécifiée',
    experience: user.experience ||0 ,
    disponibilite: user.disponibilite || 'Disponible',
    classes: user.classe ? [user.classe] : [],
    dateEmbauche: new Date().toISOString().split('T')[0], // À adapter selon votre backend
    statut: user.statutClient
  };
};


// export const educateursData: Educateur[] = [
//   {
//     id: "educateur1",
//     nom: "Bernard",
//     prenom: "Laura",
//     email: "laura.bernard@email.com",
//     telephone: "+33 6 56 78 90 12",
//     image: "/images/user/user-21.jpg",
//     specialite: "Pédagogie Montessori",
//     experience: "8 ans",
//     disponibilite: 'disponible',
//     classes: ["Petite Section", "Moyenne Section"],
//     dateEmbauche: "2020-03-15",
//     statut: 'actif'
//   },
//   {
//     id: "educateur2",
//     nom: "Moreau",
//     prenom: "Pierre",
//     email: "pierre.moreau@email.com",
//     telephone: "+33 6 67 89 01 23",
//     image: "/images/user/user-25.jpg",
//     specialite: "Langage et communication",
//     experience: "5 ans",
//     disponibilite: 'occupe',
//     classes: ["Grande Section", "CP"],
//     dateEmbauche: "2021-08-22",
//     statut: 'actif'
//   },
//   {
//     id: "educateur3",
//     nom: "Leroy",
//     prenom: "Julie",
//     email: "julie.leroy@email.com",
//     telephone: "+33 6 78 90 12 34",
//     image: "/images/user/user-33.jpg",
//     specialite: "Activités créatives",
//     experience: "3 ans",
//     disponibilite: 'disponible',
//     classes: ["Toute Petite Section", "Petite Section"],
//     dateEmbauche: "2022-01-10",
//     statut: 'actif'
//   },
//   {
//     id: "educateur4",
//     nom: "Blanc",
//     prenom: "Marc",
//     email: "marc.blanc@email.com",
//     telephone: "+33 6 89 01 23 45",
//     image: "/images/user/user-27.jpg",
//     specialite: "Psychologie infantile",
//     experience: "12 ans",
//     disponibilite: 'absence',
//     classes: ["CE1", "CE2"],
//     dateEmbauche: "2015-09-05",
//     statut: 'inactif'
//   },
//   {
//     id: "educateur5",
//     nom: "Dubois",
//     prenom: "Émilie",
//     email: "emilie.dubois@email.com",
//     telephone: "+33 6 90 12 34 56",
//     image: "/images/user/user-22.jpg",
//     specialite: "Motricité fine",
//     experience: "6 ans",
//     disponibilite: 'disponible',
//     classes: ["Moyenne Section", "Grande Section"],
//     dateEmbauche: "2021-04-18",
//     statut: 'actif'
//   },
//   {
//     id: "educateur6",
//     nom: "Garcia",
//     prenom: "Thomas",
//     email: "thomas.garcia@email.com",
//     telephone: "+33 6 01 23 45 67",
//     image: "/images/user/user-28.jpg",
//     specialite: "Éveil musical",
//     experience: "4 ans",
//     disponibilite: 'occupe',
//     classes: ["Petite Section", "Moyenne Section"],
//     dateEmbauche: "2022-11-30",
//     statut: 'actif'
//   },
//   {
//     id: "educateur7",
//     nom: "Petit",
//     prenom: "Charlotte",
//     email: "charlotte.petit@email.com",
//     telephone: "+33 6 12 34 56 78",
//     image: "/images/user/user-23.jpg",
//     specialite: "Langues étrangères",
//     experience: "7 ans",
//     disponibilite: 'disponible',
//     classes: ["CP", "CE1"],
//     dateEmbauche: "2020-06-25",
//     statut: 'actif'
//   },
//   {
//     id: "educateur8",
//     nom: "Rousseau",
//     prenom: "Nicolas",
//     email: "nicolas.rousseau@email.com",
//     telephone: "+33 6 23 45 67 89",
//     image: "/images/user/user-29.jpg",
//     specialite: "Activités sportives",
//     experience: "9 ans",
//     disponibilite: 'absence',
//     classes: ["Grande Section", "CP"],
//     dateEmbauche: "2018-02-14",
//     statut: 'inactif'
//   },
// ];