import { useState } from "react";
import PageMeta from "../components/common/PageMeta";
import ClassList from "../components/classes/ClassList";
import ClassStatistics from "../components/classes/ClassStatistics";

import ChildrenByClass from "../components/classes/ChildrenByClass.tsx";
// import AddClassModal from "../components/classes/AddClassModal";
import AddClassModal from "../components/classes/AddClassModal";

export default function ClassesPage() {
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const classes = [
    { id: "petits", name: "Petits (2-3 ans)", color: "blue", childrenCount: 18, educator: "Marie Dubois" },
    { id: "moyens", name: "Moyens (3-4 ans)", color: "green", childrenCount: 16, educator: "Jean Martin" },
    { id: "grands", name: "Grands (4-5 ans)", color: "purple", childrenCount: 14, educator: "Sophie Petit" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <PageMeta 
        title="Gestion des Classes - KI DORA"
        description="Gestion des classes d'enfants par âge et par groupe"
      />
      
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Classes</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestion des classes et distribution des enfants
          </p>
        </div>
        <button 
        onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle classe
        </button>
      </div>

      {/* Statistiques */}
      <div className="mb-6">
        <ClassStatistics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des classes */}
        <div className="lg:col-span-2">
          <ClassList 
            classes={classes}
            selectedClass={selectedClass}
            onSelectClass={setSelectedClass}
          />
        </div>

        {/* Détails de la classe */}
        <div className="lg:col-span-1">
          <ChildrenByClass 
            selectedClass={selectedClass}
            classes={classes}
          />
        </div>
      </div>

      {/* Modal d'ajout */}
      {showAddModal && (
         <AddClassModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={(newClassData) => {
          console.log("Nouvelle classe sauvegardée:", newClassData);
          // Ici vous ajouteriez la nouvelle classe à votre état
          alert(`Classe "${newClassData.className}" créée avec succès !`);
        }}
      />
      )}
    </div>
  );
}