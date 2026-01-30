import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useState } from "react";

interface Enfant {
  id: number;
  nom: string;
  prenom: string;
  age: number;
  classe: string;
  image: string;
  parent: {
    nom: string;
    prenom: string;
    image: string;
  };
  statut: 'actif' | 'inactif' | 'en_attente';
  dateInscription: string;
  dernierAcces: string;
}

// Define the table data using the interface
const enfantsData: Enfant[] = [
  {
    id: 1,
    nom: "Martin",
    prenom: "Lucas",
    age: 4,
    classe: "Petite Section",
    image: "/images/3-4_ans/enfant_1.jpg",
    parent: {
      nom: "Martin",
      prenom: "Sophie",
      image: "/images/user/user-09.jpg"
    },
    statut: 'actif',
    dateInscription: "2024-01-15",
    dernierAcces: "2024-03-20"
  },
  {
    id: 2,
    nom: "Dubois",
    prenom: "Emma",
    age: 3,
    classe: "Toute Petite Section",
    image: "/images/3-4_ans/enfant_2.jpg",
    parent: {
      nom: "Dubois",
      prenom: "Thomas",
      image: "/images/user/user-17.jpg"
    },
    statut: 'actif',
    dateInscription: "2024-01-20",
    dernierAcces: "2024-03-19"
  },
  {
    id: 3,
    nom: "Lambert",
    prenom: "Hugo",
    age: 5,
    classe: "Moyenne Section",
    image: "/images/3-4_ans/enfant_3.jpg",
    parent: {
      nom: "Lambert",
      prenom: "Marie",
      image: "/images/user/user-12.jpg"
    },
    statut: 'en_attente',
    dateInscription: "2024-02-05",
    dernierAcces: "2024-02-05"
  },
  {
    id: 4,
    nom: "Petit",
    prenom: "Léa",
    age: 6,
    classe: "Grande Section",
    image: "/images/3-4_ans/enfant_4.jpg",
    parent: {
      nom: "Petit",
      prenom: "Jean",
      image: "/images/user/user-10.jpg"
    },
    statut: 'inactif',
    dateInscription: "2023-12-10",
    dernierAcces: "2024-01-15"
  },
  {
    id: 5,
    nom: "Bernard",
    prenom: "Nathan",
    age: 4,
    classe: "Petite Section",
    image: "/images/3-4_ans/enfant_5.jpg",
    parent: {
      nom: "Bernard",
      prenom: "Laura",
      image: "/images/user/user-21.jpg"
    },
    statut: 'actif',
    dateInscription: "2024-01-10",
    dernierAcces: "2024-03-21"
  },
  {
    id: 6,
    nom: "Moreau",
    prenom: "Chloé",
    age: 7,
    classe: "CP",
    image: "/images/3-4_ans/enfant_6.jpg",
    parent: {
      nom: "Moreau",
      prenom: "Pierre",
      image: "/images/user/user-25.jpg"
    },
    statut: 'actif',
    dateInscription: "2024-01-25",
    dernierAcces: "2024-03-20"
  },
  {
    id: 7,
    nom: "Leroy",
    prenom: "Mathis",
    age: 5,
    classe: "Moyenne Section",
    image: "/images/3-4_ans/enfant_7.jpg",
    parent: {
      nom: "Leroy",
      prenom: "Julie",
      image: "/images/user/user-33.jpg"
    },
    statut: 'en_attente',
    dateInscription: "2024-02-15",
    dernierAcces: "2024-02-15"
  },
  {
    id: 8,
    nom: "Blanc",
    prenom: "Zoé",
    age: 8,
    classe: "CE1",
    image: "/images/3-4_ans/enfant_8.jpg",
    parent: {
      nom: "Blanc",
      prenom: "Marc",
      image: "/images/user/user-27.jpg"
    },
    statut: 'inactif',
    dateInscription: "2023-11-30",
    dernierAcces: "2024-01-10"
  },
];

export default function GestionEnfants() {
  const [viewMode, setViewMode] = useState<'liste' | 'grille'>('liste');
  const [classeFilter, setClasseFilter] = useState<string>("");
  const [statutFilter, setStatutFilter] = useState<string>("");
  const [parentFilter, setParentFilter] = useState<string>("");
  const [selectedEnfants, setSelectedEnfants] = useState<number[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [showSelectionHeader, setShowSelectionHeader] = useState(false);

  const [selectedEnfant, setSelectedEnfant] = useState<Enfant | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);
  const [editForm, setEditForm] = useState<Partial<Enfant>>({});

  // Options pour les filtres
  const classeOptions = ["Toutes", "Toute Petite Section", "Petite Section", "Moyenne Section", "Grande Section", "CP", "CE1"];
  const statutOptions = ["Tous", "Actif", "Inactif", "En attente"];
  const parentOptions = ["Tous", "Sophie Martin", "Thomas Dubois", "Marie Lambert", "Jean Petit", "Laura Bernard", "Pierre Moreau", "Julie Leroy", "Marc Blanc"]; 
  // Filtrer les données
  const filteredEnfants = enfantsData.filter(enfant => {
    const matchesClasse = !classeFilter || classeFilter === "Toutes" || enfant.classe === classeFilter;
    const matchesStatut = !statutFilter || statutFilter === "Tous" || 
      (statutFilter === "Actif" && enfant.statut === 'actif') ||
      (statutFilter === "Inactif" && enfant.statut === 'inactif') ||
      (statutFilter === "En attente" && enfant.statut === 'en_attente');
      const matchesParent = !parentFilter || parentFilter === "Tous" || 
    `${enfant.parent.prenom} ${enfant.parent.nom}` === parentFilter; 

    
    return matchesClasse && matchesStatut && matchesParent;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEnfant, setNewEnfant] = useState<Partial<Enfant>>({
  nom: "",
  prenom: "",
  age: 3,
  classe: "Petite Section",
  image: "/images/default-child.jpg",
  statut: 'en_attente',
  dateInscription: new Date().toISOString().split('T')[0],
  dernierAcces: new Date().toISOString().split('T')[0],
  parent: {
    nom: "",
    prenom: "",
    image: "/images/default-parent.jpg"
  }
});

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Obtenir le texte du statut
  const getStatutText = (statut: string) => {
    return statut === 'actif' ? 'Actif' : 
           statut === 'inactif' ? 'Inactif' : 
           'En attente';
  };

  // Gestion de la sélection
  const handleSelectEnfant = (enfantId: number) => {
    setSelectedEnfants(prev => {
      const newSelected = prev.includes(enfantId)
        ? prev.filter(id => id !== enfantId)
        : [...prev, enfantId];
      
      // Afficher/cacher le header de sélection
      if (newSelected.length > 0 && !showSelectionHeader) {
        setShowSelectionHeader(true);
      } else if (newSelected.length === 0 && showSelectionHeader) {
        setShowSelectionHeader(false);
      }
      
      // Mettre à jour l'état "sélectionner tout"
      setIsSelectAll(newSelected.length === filteredEnfants.length);
      
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      // Désélectionner tout
      setSelectedEnfants([]);
      setIsSelectAll(false);
      setShowSelectionHeader(false);
    } else {
      // Sélectionner tout
      const allIds = filteredEnfants.map(enfant => enfant.id);
      setSelectedEnfants(allIds);
      setIsSelectAll(true);
      setShowSelectionHeader(true);
    }
  };

  const handleCancelSelection = () => {
    setSelectedEnfants([]);
    setIsSelectAll(false);
    setShowSelectionHeader(false);
  };

  const handleDeleteSelected = () => {
    if (selectedEnfants.length === 0) return;
    
    const enfantsNames = filteredEnfants
      .filter(enfant => selectedEnfants.includes(enfant.id))
      .map(enfant => `${enfant.prenom} ${enfant.nom}`)
      .join(', ');
    
    console.log(`Suppression des enfants sélectionnés: ${enfantsNames}`);
    alert(`${selectedEnfants.length} enfant(s) supprimé(s) : ${enfantsNames}`);
    
    // Réinitialiser la sélection
    handleCancelSelection();
  };

  const handleView = (enfant: Enfant) => {
  setSelectedEnfant(enfant);
  setModalType('view');
};

const handleEdit = (enfant: Enfant) => {
  setSelectedEnfant(enfant);
  setEditForm({
    nom: enfant.nom,
    prenom: enfant.prenom,
    age: enfant.age,
    classe: enfant.classe,
    statut: enfant.statut
  });
  setModalType('edit');
};

const handleDelete = (enfant: Enfant) => {
  setSelectedEnfant(enfant);
  setModalType('delete');
};

const handleSaveEdit = () => {
  if (selectedEnfant && editForm) {
    console.log("Sauvegarder modifications:", editForm);
    alert(`Modifications sauvegardées pour ${editForm.prenom} ${editForm.nom}`);
    closeModal();
  }
};

const confirmDelete = () => {
  if (selectedEnfant) {
    console.log(`Suppression de ${selectedEnfant.prenom} ${selectedEnfant.nom}`);
    alert(`Enfant "${selectedEnfant.prenom} ${selectedEnfant.nom}" supprimé`);
    closeModal();
  }
};

const closeModal = () => {
  setSelectedEnfant(null);
  setModalType(null);
  setEditForm({});
};

const ViewEnfantModal = ({ 
  isOpen, 
  onClose, 
  enfant,
  onEdit 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  enfant: Enfant;
  onEdit: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={onClose} />
      <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Détails de l'Enfant
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {enfant.prenom} {enfant.nom}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Photo et infos de base */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="relative">
                <div className="w-24 h-24 overflow-hidden rounded-full">
                  <img
                    src={enfant.image}
                    alt={`${enfant.prenom} ${enfant.nom}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <Badge
                    size="sm"
                    color={
                      enfant.statut === 'actif'
                        ? "success"
                        : enfant.statut === 'inactif'
                          ? "error"
                          : "warning"
                    }
                  >
                    {getStatutText(enfant.statut)}
                  </Badge>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  {enfant.prenom} {enfant.nom}
                </h4>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Âge</p>
                    <p className="font-medium">{enfant.age} ans</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Classe</p>
                    <p className="font-medium">{enfant.classe}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations sur le parent */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <h5 className="font-medium text-gray-900 dark:text-white mb-3">Parent Référent</h5>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img
                    src={enfant.parent.image}
                    alt={`${enfant.parent.prenom} ${enfant.parent.nom}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {enfant.parent.prenom} {enfant.parent.nom}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Responsable légal
                  </p>
                </div>
                <button className="px-3 py-1.5 text-sm text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50">
                  Contacter
                </button>
              </div>
            </div>

            {/* Dates importantes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">Dates importantes</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Inscrit le :</span>
                    <span className="font-medium">{formatDate(enfant.dateInscription)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Dernier accès :</span>
                    <span className="font-medium">{formatDate(enfant.dernierAcces)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">Informations</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">ID :</span>
                    <span className="font-medium">#{enfant.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Statut actuel :</span>
                    <Badge
                      size="sm"
                      color={
                        enfant.statut === 'actif'
                          ? "success"
                          : enfant.statut === 'inactif'
                            ? "error"
                            : "warning"
                      }
                    >
                      {getStatutText(enfant.statut)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={onEdit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditEnfantModal = ({
  isOpen,
  onClose,
  enfant,
  formData,
  onFormChange,
  onSave
}: {
  isOpen: boolean;
  onClose: () => void;
  enfant: Enfant;
  formData: Partial<Enfant>;
  onFormChange: (field: keyof Enfant, value: any) => void;
  onSave: () => void;
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  const classes = ["Toute Petite Section", "Petite Section", "Moyenne Section", "Grande Section", "CP", "CE1", "CE2"];

  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={onClose} />
      <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Modifier l'Enfant
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {enfant.prenom} {enfant.nom}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Photo */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 overflow-hidden rounded-full">
                  <img
                    src={enfant.image}
                    alt={`${enfant.prenom} ${enfant.nom}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Photo (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.image || enfant.image}
                    onChange={(e) => onFormChange('image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                </div>
              </div>

              {/* Nom et Prénom */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={formData.nom || ''}
                    onChange={(e) => onFormChange('nom', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={formData.prenom || ''}
                    onChange={(e) => onFormChange('prenom', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                </div>
              </div>

              {/* Âge et Classe */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Âge
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="18"
                    value={formData.age || 0}
                    onChange={(e) => onFormChange('age', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Classe
                  </label>
                  <select
                    value={formData.classe || ''}
                    onChange={(e) => onFormChange('classe', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  >
                    <option value="">Sélectionnez une classe</option>
                    {classes.map(classe => (
                      <option key={classe} value={classe}>{classe}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Statut */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Statut
                </label>
                <select
                  value={formData.statut || 'actif'}
                  onChange={(e) => onFormChange('statut', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                >
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                  <option value="en_attente">En attente</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const DeleteEnfantModal = ({
  isOpen,
  onClose,
  enfant,
  onDelete
}: {
  isOpen: boolean;
  onClose: () => void;
  enfant: Enfant;
  onDelete: () => void;
}) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={onClose} />
      <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Supprimer l'enfant
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Confirmez la suppression
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <div className="px-6 py-4">
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Êtes-vous sûr de vouloir supprimer l'enfant
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {enfant.prenom} {enfant.nom}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Cette action ne peut pas être annulée.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Attention :</span> La suppression de cet enfant entraînera :
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Perte de toutes les données associées</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Suppression du profil de l'enfant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Les parents seront notifiés</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const handleAddNew = () => {
  setIsAddModalOpen(true);
};

const handleSaveNew = () => {
  // Générer un nouvel ID
  const newId = Math.max(...enfantsData.map(e => e.id)) + 1;
  
  // Créer le nouvel enfant
  const nouvelEnfant: Enfant = {
    id: newId,
    nom: newEnfant.nom || "",
    prenom: newEnfant.prenom || "",
    age: newEnfant.age || 3,
    classe: newEnfant.classe || "Petite Section",
    image: newEnfant.image || "/images/default-child.jpg",
    statut: newEnfant.statut || 'en_attente',
    dateInscription: newEnfant.dateInscription || new Date().toISOString().split('T')[0],
    dernierAcces: newEnfant.dernierAcces || new Date().toISOString().split('T')[0],
    parent: {
      nom: newEnfant.parent?.nom || "",
      prenom: newEnfant.parent?.prenom || "",
      image: newEnfant.parent?.image || "/images/default-parent.jpg"
    }
  };

  console.log("Nouvel enfant ajouté:", nouvelEnfant);
  alert(`Enfant "${nouvelEnfant.prenom} ${nouvelEnfant.nom}" ajouté avec succès`);
  
  // Réinitialiser le formulaire
  setNewEnfant({
    nom: "",
    prenom: "",
    age: 3,
    classe: "Petite Section",
    image: "/images/default-child.jpg",
    statut: 'en_attente',
    dateInscription: new Date().toISOString().split('T')[0],
    dernierAcces: new Date().toISOString().split('T')[0],
    parent: {
      nom: "",
      prenom: "",
      image: "/images/default-parent.jpg"
    }
  });
  
  setIsAddModalOpen(false);
};

const closeAddModal = () => {
  setIsAddModalOpen(false);
  setNewEnfant({
    nom: "",
    prenom: "",
    age: 3,
    classe: "Petite Section",
    image: "/images/default-child.jpg",
    statut: 'en_attente',
    dateInscription: new Date().toISOString().split('T')[0],
    dernierAcces: new Date().toISOString().split('T')[0],
    parent: {
      nom: "",
      prenom: "",
      image: "/images/default-parent.jpg"
    }
  });
};

const AddEnfantModal = ({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onSave
}: {
  isOpen: boolean;
  onClose: () => void;
  formData: Partial<Enfant>;
  onFormChange: (field: keyof Enfant, value: any) => void;
  onSave: () => void;
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  const classes = ["Toute Petite Section", "Petite Section", "Moyenne Section", "Grande Section", "CP", "CE1", "CE2"];

  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={onClose} />
      <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Ajouter un nouvel enfant
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remplissez les informations de l'enfant
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Informations de l'enfant */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  Informations de l'enfant
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nom || ''}
                      onChange={(e) => onFormChange('nom', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      placeholder="Entrez le nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.prenom || ''}
                      onChange={(e) => onFormChange('prenom', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      placeholder="Entrez le prénom"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Âge *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="18"
                      value={formData.age || 3}
                      onChange={(e) => onFormChange('age', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Classe *
                    </label>
                    <select
                      required
                      value={formData.classe || 'Petite Section'}
                      onChange={(e) => onFormChange('classe', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    >
                      {classes.map(classe => (
                        <option key={classe} value={classe}>{classe}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL de la photo
                  </label>
                  <input
                    type="text"
                    value={formData.image || '/images/default-child.jpg'}
                    onChange={(e) => onFormChange('image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    placeholder="/images/..."
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Statut *
                  </label>
                  <select
                    required
                    value={formData.statut || 'en_attente'}
                    onChange={(e) => onFormChange('statut', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  >
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                    <option value="en_attente">En attente</option>
                  </select>
                </div>
              </div>

              {/* Informations du parent */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                Parent référent *
              </h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sélectionner un parent existant
                </label>
                <select
                  required
                  value={`${formData.parent?.prenom || ''} ${formData.parent?.nom || ''}`}
                  onChange={(e) => {
                    if (e.target.value) {
                      const selectedParent = parentOptions
                        .filter(opt => opt !== "Tous")
                        .find(opt => opt === e.target.value);
                      
                      if (selectedParent) {
                        const [prenom, nom] = selectedParent.split(' ');
                        const parentData = enfantsData.find(e => 
                          e.parent.prenom === prenom && e.parent.nom === nom
                        );
                        
                        if (parentData) {
                          onFormChange('parent', {
                            nom: parentData.parent.nom,
                            prenom: parentData.parent.prenom,
                            image: parentData.parent.image
                          });
                        }
                      }
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4"
                >
                  <option value="">Sélectionnez un parent...</option>
                  {parentOptions
                    .filter(option => option !== "Tous")
                    .map(parent => (
                      <option key={parent} value={parent}>
                        {parent}
                      </option>
                    ))}
                </select>
              </div>

              {/* Affichage du parent sélectionné */}
              {formData.parent?.nom && formData.parent?.prenom && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Parent sélectionné :
                  </h5>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
                      <img
                        src={formData.parent.image || '/images/default-parent.jpg'}
                        alt={`${formData.parent.prenom} ${formData.parent.nom}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/default-parent.jpg';
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formData.parent.prenom} {formData.parent.nom}
                      </p>
                      
                    </div>
                  </div>
                </div>
              )}
            </div>

            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Ajouter l'enfant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Header de sélection */}
     

      {/* En-tête avec filtres et boutons de vue */}
      <div className="p-6 border-b border-gray-100 dark:border-white/[0.05] bg-white dark:bg-gray-900/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Liste des Enfants
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Gérez les enfants et leurs informations
              </p>
            </div>
            
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nouveau Enfant
            </button>
          </div>
          </div>
            <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Filtre par classe */}
            <div className="w-full sm:w-auto">
              <label htmlFor="classeFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Classe
              </label>
              <select
                id="classeFilter"
                value={classeFilter}
                onChange={(e) => setClasseFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {classeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtre par statut */}
            <div className="w-full sm:w-auto">
              <label htmlFor="statutFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Statut
              </label>
              <select
                id="statutFilter"
                value={statutFilter}
                onChange={(e) => setStatutFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {statutOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>


            {/* AJOUTER ICI - Filtre par parent */}
            <div className="w-full sm:w-auto">
            <label htmlFor="parentFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Parent
            </label>
            <select
                id="parentFilter"
                value={parentFilter}
                onChange={(e) => setParentFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
                {parentOptions.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
                ))}
            </select>
            </div>

            {/* Bouton pour réinitialiser les filtres */}
            <div className="w-full sm:w-auto flex items-end">
              <button
                onClick={() => {
                  setClasseFilter("");
                  setStatutFilter("");
                  setParentFilter("");
                }}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Réinitialiser
              </button>
            </div>
          </div>

          {/* Boutons de changement de vue */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Vue :</span>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden dark:border-gray-700">
              <button
                onClick={() => setViewMode('liste')}
                className={`px-3 py-2 text-sm font-medium ${viewMode === 'liste' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                title="Vue liste"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grille')}
                className={`px-3 py-2 text-sm font-medium ${viewMode === 'grille' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                title="Vue grille"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Compteur de résultats */}
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {filteredEnfants.length} enfant(s) trouvé(s)
        </div>
      </div>
       
         {selectedEnfants.length > 0 && (
          <div className="bg-indigo-500 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-100 dark:border-blue-800/30 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-800 rounded-full">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                    {selectedEnfants.length}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  enfant(s) sélectionné(s)
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleDeleteSelected}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Supprimer
              </button>
              
              <button
                onClick={handleCancelSelection}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Affichage en mode Liste */}
      {viewMode === 'liste' ? (
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
             <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-700">
              <TableRow>
                <TableCell
                  isHeader
                 className="px-5 py-3 font-medium text-white text-start text-theme-xs"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isSelectAll}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-2">Enfant</span>
                  </div>
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-white text-start text-theme-xs"
                >
                  Parent
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-white text-start text-theme-xs"
                >
                  Âge & Classe
                </TableCell>
                <TableCell
                  isHeader
                 className="px-5 py-3 font-medium text-white text-start text-theme-xs"
                >
                  Statut
                </TableCell>
                <TableCell
                  isHeader
                 className="px-5 py-3 font-medium text-white text-start text-theme-xs"
                >
                  Date d'inscription
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-white text-start text-theme-xs"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredEnfants.map((enfant) => (
                <TableRow key={enfant.id} className={selectedEnfants.includes(enfant.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedEnfants.includes(enfant.id)}
                        onChange={() => handleSelectEnfant(enfant.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img
                            width={40}
                            height={40}
                            src={enfant.image}
                            alt={`${enfant.prenom} ${enfant.nom}`}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {enfant.prenom} {enfant.nom}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            ID: {enfant.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 overflow-hidden rounded-full">
                        <img
                          width={24}
                          height={24}
                          src={enfant.parent.image}
                          alt={`${enfant.parent.prenom} ${enfant.parent.nom}`}
                        />
                      </div>
                      <div>
                        <span className="block text-sm">{enfant.parent.prenom} {enfant.parent.nom}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="space-y-1">
                      <span className="block text-sm">{enfant.age} ans</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{enfant.classe}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        enfant.statut === 'actif'
                          ? "success"
                          : enfant.statut === 'inactif'
                            ? "error"
                            : "warning"
                      }
                    >
                      {getStatutText(enfant.statut)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {formatDate(enfant.dateInscription)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(enfant)}
                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30"
                        title="Voir les détails"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEdit(enfant)}
                        className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-green-900/30"
                        title="Éditer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(enfant)}
                        className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30"
                        title="Supprimer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        // Affichage en mode Grille
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEnfants.map((enfant) => (
              <div 
                key={enfant.id} 
                className={`border rounded-lg p-4 hover:shadow-lg transition-shadow dark:hover:border-gray-600 ${selectedEnfants.includes(enfant.id) ? 'border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedEnfants.includes(enfant.id)}
                      onChange={() => handleSelectEnfant(enfant.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 overflow-hidden rounded-full">
                        <img
                          width={48}
                          height={48}
                          src={enfant.image}
                          alt={`${enfant.prenom} ${enfant.nom}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {enfant.prenom} {enfant.nom}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {enfant.age} ans • {enfant.classe}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Badge
                    size="sm"
                    color={
                      enfant.statut === 'actif'
                        ? "success"
                        : enfant.statut === 'inactif'
                          ? "error"
                          : "warning"
                    }
                  >
                    {getStatutText(enfant.statut)}
                  </Badge>
                </div>

                {/* Parent */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 overflow-hidden rounded-full">
                      <img
                        width={32}
                        height={32}
                        src={enfant.parent.image}
                        alt={`${enfant.parent.prenom} ${enfant.parent.nom}`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Parent
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {enfant.parent.prenom} {enfant.parent.nom}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Informations */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Inscrit le :</span>
                    <span className="text-gray-700 dark:text-gray-300">{formatDate(enfant.dateInscription)}</span>
                  </div>
            
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleView(enfant)}
                    className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
                    title="Voir les détails"
                  >
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Voir
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(enfant)}
                      className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-green-900/30"
                      title="Éditer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(enfant)}
                      className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30"
                      title="Supprimer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message si aucun enfant trouvé */}
      {filteredEnfants.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-gray-400 dark:text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9.708a4 4 0 01-7 0" />
            </svg>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-1">
              Aucun enfant trouvé
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Essayez de modifier vos critères de filtrage
            </p>
          </div>
        </div>
      )}

      {modalType === 'view' && selectedEnfant && (
  <ViewEnfantModal
    isOpen={true}
    onClose={closeModal}
    enfant={selectedEnfant}
    onEdit={() => handleEdit(selectedEnfant)}
  />
)}

{/* Modal Éditer */}
{modalType === 'edit' && selectedEnfant && (
  <EditEnfantModal
    isOpen={true}
    onClose={closeModal}
    enfant={selectedEnfant}
    formData={editForm}
    onFormChange={(field, value) => setEditForm(prev => ({ ...prev, [field]: value }))}
    onSave={handleSaveEdit}
  />
)}

{/* Modal Supprimer */}
{modalType === 'delete' && selectedEnfant && (
  <DeleteEnfantModal
    isOpen={true}
    onClose={closeModal}
    enfant={selectedEnfant}
    onDelete={confirmDelete}
  />
)}

{isAddModalOpen && (
  <AddEnfantModal
    isOpen={isAddModalOpen}
    onClose={closeAddModal}
    formData={newEnfant}
    onFormChange={(field, value) => setNewEnfant(prev => ({ ...prev, [field]: value }))}
    onSave={handleSaveNew}
  />
)}
    </div>
  );
}