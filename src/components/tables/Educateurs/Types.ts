export interface Educateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  image: string;
  specialite: string;
  experience: string;
  disponibilite: 'disponible' | 'occupe' | 'absence';
  classes: string[];
  dateEmbauche: string;
  statut: 'actif' | 'inactif';
}


export const educateursData: Educateur[] = [
  {
    id: 1,
    nom: "Bernard",
    prenom: "Laura",
    email: "laura.bernard@email.com",
    telephone: "+33 6 56 78 90 12",
    image: "/images/user/user-21.jpg",
    specialite: "Pédagogie Montessori",
    experience: "8 ans",
    disponibilite: 'disponible',
    classes: ["Petite Section", "Moyenne Section"],
    dateEmbauche: "2020-03-15",
    statut: 'actif'
  },
  {
    id: 2,
    nom: "Moreau",
    prenom: "Pierre",
    email: "pierre.moreau@email.com",
    telephone: "+33 6 67 89 01 23",
    image: "/images/user/user-25.jpg",
    specialite: "Langage et communication",
    experience: "5 ans",
    disponibilite: 'occupe',
    classes: ["Grande Section", "CP"],
    dateEmbauche: "2021-08-22",
    statut: 'actif'
  },
  {
    id: 3,
    nom: "Leroy",
    prenom: "Julie",
    email: "julie.leroy@email.com",
    telephone: "+33 6 78 90 12 34",
    image: "/images/user/user-33.jpg",
    specialite: "Activités créatives",
    experience: "3 ans",
    disponibilite: 'disponible',
    classes: ["Toute Petite Section", "Petite Section"],
    dateEmbauche: "2022-01-10",
    statut: 'actif'
  },
  {
    id: 4,
    nom: "Blanc",
    prenom: "Marc",
    email: "marc.blanc@email.com",
    telephone: "+33 6 89 01 23 45",
    image: "/images/user/user-27.jpg",
    specialite: "Psychologie infantile",
    experience: "12 ans",
    disponibilite: 'absence',
    classes: ["CE1", "CE2"],
    dateEmbauche: "2015-09-05",
    statut: 'inactif'
  },
  {
    id: 5,
    nom: "Dubois",
    prenom: "Émilie",
    email: "emilie.dubois@email.com",
    telephone: "+33 6 90 12 34 56",
    image: "/images/user/user-22.jpg",
    specialite: "Motricité fine",
    experience: "6 ans",
    disponibilite: 'disponible',
    classes: ["Moyenne Section", "Grande Section"],
    dateEmbauche: "2021-04-18",
    statut: 'actif'
  },
  {
    id: 6,
    nom: "Garcia",
    prenom: "Thomas",
    email: "thomas.garcia@email.com",
    telephone: "+33 6 01 23 45 67",
    image: "/images/user/user-28.jpg",
    specialite: "Éveil musical",
    experience: "4 ans",
    disponibilite: 'occupe',
    classes: ["Petite Section", "Moyenne Section"],
    dateEmbauche: "2022-11-30",
    statut: 'actif'
  },
  {
    id: 7,
    nom: "Petit",
    prenom: "Charlotte",
    email: "charlotte.petit@email.com",
    telephone: "+33 6 12 34 56 78",
    image: "/images/user/user-23.jpg",
    specialite: "Langues étrangères",
    experience: "7 ans",
    disponibilite: 'disponible',
    classes: ["CP", "CE1"],
    dateEmbauche: "2020-06-25",
    statut: 'actif'
  },
  {
    id: 8,
    nom: "Rousseau",
    prenom: "Nicolas",
    email: "nicolas.rousseau@email.com",
    telephone: "+33 6 23 45 67 89",
    image: "/images/user/user-29.jpg",
    specialite: "Activités sportives",
    experience: "9 ans",
    disponibilite: 'absence',
    classes: ["Grande Section", "CP"],
    dateEmbauche: "2018-02-14",
    statut: 'inactif'
  },
];