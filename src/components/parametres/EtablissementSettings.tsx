import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useState } from "react";

export default function EtablissementSettings() {
  const { isOpen, openModal, closeModal } = useModal();
  const [settings, setSettings] = useState({
    nomEtablissement: "KI DORA - Crèche & École Maternelle",
    typeEtablissement: "Crèche & École Maternelle",
    adresse: "123 Rue de l'Éducation, Sfax, Tunisie",
    telephone: "+216 74 123 456",
    email: "contact@kidora.tn",
    directeur: "Mohamed Beissagh",
    capaciteMaximale: 100,
    nombreClasses: 8,
    heureOuverture: "07:00",
    heureFermeture: "18:00",
    facebook: "https://www.facebook.com/KIDORATunisie",
    instagram: "https://instagram.com/KIDORA",
  });

  const handleSave = () => {
    // Sauvegarde des paramètres
    console.log("Sauvegarde des paramètres:", settings);
    closeModal();
  };

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col gap-6">
          {/* En-tête avec bouton d'édition */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Paramètres Géneraux
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Gérez les informations de votre établissement
              </p>
            </div>
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier
            </button>
          </div>

          {/* Informations actuelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Nom de l'établissement
                </h3>
                <p className="text-gray-800 dark:text-white font-medium">
                  {settings.nomEtablissement}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Type d'établissement
                </h3>
                <p className="text-gray-800 dark:text-white font-medium">
                  {settings.typeEtablissement}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Adresse
                </h3>
                <p className="text-gray-800 dark:text-white font-medium">
                  {settings.adresse}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Directeur
                </h3>
                <p className="text-gray-800 dark:text-white font-medium">
                  {settings.directeur}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Contact
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-800 dark:text-white">
                    📞 {settings.telephone}
                  </p>
                  <p className="text-gray-800 dark:text-white">
                    📧 {settings.email}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Capacité
                </h3>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {settings.capaciteMaximale}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Enfants max
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {settings.nombreClasses}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Classes
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Horaires d'ouverture
                </h3>
                <p className="text-gray-800 dark:text-white font-medium">
                  {settings.heureOuverture} - {settings.heureFermeture}
                </p>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Réseaux sociaux
            </h3>
            <div className="flex gap-4">
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
              
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'édition */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-3xl m-4">
        <div className="relative w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900">
          <div className="mb-6">
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
              Modifier les paramètres de l'établissement
            </h4>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Mettez à jour les informations de votre établissement
            </p>
          </div>
          
          <form className="flex flex-col">
            <div className="custom-scrollbar max-h-[500px] overflow-y-auto pr-2">
              {/* Informations de base */}
              <div className="mb-8">
                <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                  Informations de base
                </h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nom de l'établissement *</Label>
                    <Input
                      type="text"
                      value={settings.nomEtablissement}
                      onChange={(e) => handleChange('nomEtablissement', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label>Type d'établissement *</Label>
                    <Input
                      type="text"
                      value={settings.typeEtablissement}
                      onChange={(e) => handleChange('typeEtablissement', e.target.value)}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label>Adresse complète *</Label>
                    <Input
                      type="text"
                      value={settings.adresse}
                      onChange={(e) => handleChange('adresse', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label>Nom du directeur *</Label>
                    <Input
                      type="text"
                      value={settings.directeur}
                      onChange={(e) => handleChange('directeur', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label>Téléphone *</Label>
                    <Input
                      type="tel"
                      value={settings.telephone}
                      onChange={(e) => handleChange('telephone', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Capacité et horaires */}
              <div className="mb-8">
                <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                  Capacité et horaires
                </h5>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Capacité maximale *</Label>
                    <Input
                      type="number"
                      value={settings.capaciteMaximale}
                      onChange={(e) => handleChange('capaciteMaximale', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label>Nombre de classes *</Label>
                    <Input
                      type="number"
                      value={settings.nombreClasses}
                      onChange={(e) => handleChange('nombreClasses', e.target.value)}
                    />
                  </div>
                  
                  <div className="md:col-span-3 grid grid-cols-2 gap-4">
                    <div>
                      <Label>Heure d'ouverture *</Label>
                      <Input
                        type="time"
                        value={settings.heureOuverture}
                        onChange={(e) => handleChange('heureOuverture', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label>Heure de fermeture *</Label>
                      <Input
                        type="time"
                        value={settings.heureFermeture}
                        onChange={(e) => handleChange('heureFermeture', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Réseaux sociaux */}
              <div className="mb-8">
                <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                  Réseaux sociaux
                </h5>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Lien Facebook</Label>
                    <Input
                      type="url"
                      value={settings.facebook}
                      onChange={(e) => handleChange('facebook', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label>Lien Instagram</Label>
                    <Input
                      type="url"
                      value={settings.instagram}
                      onChange={(e) => handleChange('instagram', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Annuler
              </Button>
              <Button size="sm" onClick={handleSave}>
                Sauvegarder les modifications
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}