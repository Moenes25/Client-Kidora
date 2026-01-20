import { useState, useEffect } from "react";
import classService, { ClasseRequestDto } from '../../services/api/classService';

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void; // Callback optionnelle pour rafraîchir la liste
}

export default function AddClassModal({ isOpen, onClose, onSave }: AddClassModalProps) {
  const [formData, setFormData] = useState({
    className: "",
    ageRange: "4-5 ans",
    capacity: 20,
    room: "",
    color: "blue",
    description: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'capacity' ? parseInt(value) || 0 : value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.className.trim()) newErrors.className = "Le nom de la classe est requis";
    if (formData.capacity < 1) newErrors.capacity = "La capacité doit être supérieure à 0";
    if (formData.capacity > 50) newErrors.capacity = "La capacité maximale est de 50 élèves";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);

    try {
      const classData: ClasseRequestDto = {
        nom_classe: formData.className,
        description_classe: formData.description || undefined,
        trancheAge: formData.ageRange,
        couleur_classe: formData.color,
        capacite: formData.capacity,
        salle: formData.room || undefined
      };

      await classService.createClass(classData);
      
      // Réinitialiser le formulaire
      setFormData({
        className: "",
        ageRange: "4-5 ans",
        capacity: 20,
        room: "",
        color: "blue",
        description: ""
      });
      
      // Fermer la modal
      onClose();
      
      // Appeler le callback pour rafraîchir la liste des classes
      if (onSave) {
        onSave();
      }
      
    } catch (error: any) {
      console.error("Erreur lors de la création de la classe:", error);
      
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        const newErrors: Record<string, string> = {};
        
        backendErrors.forEach((err: any) => {
          if (err.field === 'nom_classe') newErrors.className = err.message;
          if (err.field === 'capacite') newErrors.capacity = err.message;
          if (err.field === 'trancheAge') newErrors.ageRange = err.message;
          if (err.field === 'couleur_classe') newErrors.color = err.message;
        });
        
        setErrors(newErrors);
      } else {
        alert(`Erreur: ${error.response?.data?.message || "Une erreur est survenue"}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const colorOptions = classService.getColorOptions();
  const ageRangeOptions = classService.getAgeRangeOptions();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 z-[100000]" onClick={onClose} />
      <div className="relative z-[100001] flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Nouvelle Classe
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ajouter une nouvelle classe
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              disabled={isLoading}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Icône et nom */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏫</span>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom de la classe *
                  </label>
                  <input
                    type="text"
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.className 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    } dark:bg-gray-700 dark:text-white`}
                    placeholder="Ex: CM1 A, Grande Section, CE2"
                    disabled={isLoading}
                  />
                  {errors.className && (
                    <p className="mt-1 text-sm text-red-600">{errors.className}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (optionnelle)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Brève description de la classe..."
                  disabled={isLoading}
                />
              </div>

              {/* Tranche d'âge et Couleur */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tranche d'âge *
                  </label>
                  <select
                    name="ageRange"
                    value={formData.ageRange}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    disabled={isLoading}
                  >
                    {ageRangeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.ageRange && (
                    <p className="mt-1 text-sm text-red-600">{errors.ageRange}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Couleur de la classe *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorOptions.map(color => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => !isLoading && setFormData(prev => ({ ...prev, color: color.value }))}
                        className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border ${
                          formData.color === color.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                      >
                        <div className={`w-4 h-4 rounded-full ${color.bg} ${color.text}`}></div>
                        <span className="text-sm">{color.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Capacité */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Capacité maximale *
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    name="capacity"
                    min="5"
                    max="50"
                    step="5"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full"
                    disabled={isLoading}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">5</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {formData.capacity} élèves
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">50</span>
                  </div>
                </div>
                {errors.capacity && (
                  <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
                )}
              </div>

              {/* Salle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Salle / Local (optionnel)
                </label>
                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ex: Salle 1, Bâtiment A"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                disabled={isLoading}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Création..." : "Créer la classe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}