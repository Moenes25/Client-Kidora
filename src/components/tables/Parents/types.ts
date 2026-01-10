export interface Parent {
  id: number;
  nomPrenom: string;
  email: string;
  telephone: string;
  relation: string;
  enfants: {
    images: string[];
  };
  statut: string;
  profession: string;
  image: string;
}

export const tableData: Parent[] = [
  {
    id: 1,
    nomPrenom: "Sophie Martin",
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
    id: 2,
    nomPrenom: "Thomas Dubois",
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
    id: 3,
    nomPrenom: "Marie Lambert",
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
    id: 4,
    nomPrenom: "Jean Petit",
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
    id: 5,
    nomPrenom: "Laura Bernard",
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
    id: 6,
    nomPrenom: "Pierre Moreau",
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
    id: 7,
    nomPrenom: "Julie Leroy",
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
    id: 8,
    nomPrenom: "Marc Blanc",
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
