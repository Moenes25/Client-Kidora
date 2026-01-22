import { useState, useEffect } from "react";

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (formData: ClassFormData) => void;
}

interface ClassFormData {
  className: string;
  ageRange: string;
  capacity: number;
  educator: string;
  room: string;
  color: string;
  description?: string;
}

export default function AddClassModal({ isOpen, onClose, onSave }: AddClassModalProps) {
  const [formData, setFormData] = useState<ClassFormData>({
    className: "",
    ageRange: "2-3",
    capacity: 20,
    educator: "",
    room: "",
    color: "blue",
    description: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!formData.educator.trim()) newErrors.educator = "Le nom de l'éducateur est requis";
    if (formData.capacity < 1) newErrors.capacity = "La capacité doit être supérieure à 0";
    if (formData.capacity > 50) newErrors.capacity = "La capacité maximale est de 50 enfants";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Nouvelle classe créée:", formData);
      
      if (onSave) {
        onSave(formData);
      }
      
      // Réinitialiser le formulaire
      setFormData({
        className: "",
        ageRange: "2-3",
        capacity: 20,
        educator: "",
        room: "",
        color: "blue",
        description: ""
      });
      
      onClose();
    } else {
      setErrors(formErrors);
    }
  };

  const colorOptions = [
    { value: "blue", label: "Bleu", bg: "bg-blue-100", text: "text-blue-600" },
    { value: "green", label: "Vert", bg: "bg-green-100", text: "text-green-600" },
    { value: "purple", label: "Violet", bg: "bg-purple-100", text: "text-purple-600" },
    { value: "orange", label: "Orange", bg: "bg-orange-100", text: "text-orange-600" },
    { value: "pink", label: "Rose", bg: "bg-pink-100", text: "text-pink-600" },
    { value: "indigo", label: "Indigo", bg: "bg-indigo-100", text: "text-indigo-600" },
  ];

  const ageRangeOptions = [
    { value: "2-3", label: "2-3 ans (Petits)" },
    { value: "3-4", label: "3-4 ans (Moyens)" },
    { value: "4-5", label: "4-5 ans (Grands)" },
    { value: "5-6", label: "5-6 ans (Pré-scolaire)" },
    { value: "6-7", label: "6-7 ans (CP)" },
    { value: "7-8", label: "7-8 ans (CE1)" },
  ];

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
                Ajouter une nouvelle classe à la crèche
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
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
                    placeholder="Ex: Petits, Moyens, Grands"
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
                  >
                    {ageRangeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
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
                        onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                        className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border ${
                          formData.color === color.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${color.bg} ${color.text}`}></div>
                        <span className="text-sm">{color.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Capacité et Éducateur */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">5</span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {formData.capacity} enfants
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">50</span>
                    </div>
                  </div>
                  {errors.capacity && (
                    <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Éducateur principal *
                  </label>
                  <input
                    type="text"
                    name="educator"
                    value={formData.educator}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.educator 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    } dark:bg-gray-700 dark:text-white`}
                    placeholder="Nom de l'éducateur"
                  />
                  {errors.educator && (
                    <p className="mt-1 text-sm text-red-600">{errors.educator}</p>
                  )}
                </div>
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
                />
              </div>

              {/* Aperçu */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Aperçu de la classe</h4>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg ${
                    formData.color === 'blue' ? 'bg-blue-100' :
                    formData.color === 'green' ? 'bg-green-100' :
                    formData.color === 'purple' ? 'bg-purple-100' :
                    formData.color === 'orange' ? 'bg-orange-100' :
                    formData.color === 'pink' ? 'bg-pink-100' : 'bg-indigo-100'
                  } flex items-center justify-center`}>
                    <span className="text-xl">👶</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formData.className || "Nom de la classe"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {ageRangeOptions.find(a => a.value === formData.ageRange)?.label || "2-3 ans"} • {formData.capacity} places
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Créer la classe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}