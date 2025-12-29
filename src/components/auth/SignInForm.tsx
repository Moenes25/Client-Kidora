import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

const STATIC_ACCOUNTS = [
  {
    nom : "Admin",
    email: "admin@kidora.com",
    password: "admin123",
    redirectTo: "/",
    role: "admin"
  },
  {
    nom : "Educateur",
    email: "educator@kidora.com",
    password: "educ123",
    redirectTo: "/educateur",
    role: "educateur"
  },
  {
    nom : "Parent",
    email: "parent@kidora.com",
    password: "parent123",
    redirectTo: "/parent",
    role: "parent"
  }
];

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validation basique
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    // Vérification des identifiants
    const account = STATIC_ACCOUNTS.find(
      acc => acc.email === email && acc.password === password
    );

    if (account) {
      // Stocker les informations de l'utilisateur
      const userData = {
        email: account.email,
        role: account.role,
        isLoggedIn: true,
        stayLoggedIn: isChecked
      };

      // Stocker dans localStorage si "Rester connecté" est coché
      if (isChecked) {
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userData));
      }

      // Rediriger vers la page correspondante
      navigate(account.redirectTo);
      
      // Optionnel : recharger la page pour mettre à jour l'état d'authentification
      window.location.reload();
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  // Fonction pour pré-remplir les champs (facultatif, pour le développement)
  const fillAccount = (accountIndex: number) => {
    const account = STATIC_ACCOUNTS[accountIndex];
    if (account) {
      setEmail(account.email);
      setPassword(account.password);
      setError("");
    }
  };

  return (
  <div className="w-full max-w-sm mx-auto">
    {/* Carte du formulaire avec hauteur réduite */}
    <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100"> {/* p-5 au lieu de p-6 */}
      {/* Message d'erreur */}
      {error && (
        <div className="mb-3 p-2 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200"> {/* mb-3 p-2 */}
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4"> {/* space-y-4 au lieu de space-y-5 */}
          
          {/* Logo avec espace réduit */}
   <div className="text-center mb-6">
  <div className="inline-flex items-center justify-center mb-2"> {/* Changé de mb-4 à mb-2 */}
    <img 
      src="/images/logo/logo.png"
      alt="KIDORA Logo" 
      className="w-32 h-32 object-contain" 
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        target.parentElement!.innerHTML = `
          <div class="w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
            <span class="text-3xl font-bold text-white">K</span>
          </div>
        `;
      }}
    />
  </div>
</div>
          {/* Champ Email */}
          <div className="space-y-1"> {/* space-y-1 au lieu de space-y-1.5 */}
            <label className="text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              placeholder="superadmin@kidora.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm" /* py-2 au lieu de py-2.5 */
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-1"> {/* space-y-1 au lieu de space-y-1.5 */}
            <label className="text-sm font-medium text-gray-900">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="......"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white tracking-widest pr-10 text-sm" /* py-2 au lieu de py-2.5 */
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm" /* right-2 au lieu de right-3 */
              >
                {showPassword ? (
                  <EyeIcon className="h-4 w-4" /> 
                ) : (
                  <EyeCloseIcon className="h-4 w-4" /> 
                )}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between pt-0.5"> {/* pt-0.5 au lieu de pt-1 */}
            <div className="flex items-center">
              <Checkbox
                checked={isChecked}
                onChange={setIsChecked}
                className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" /* h-3.5 w-3.5 */
              />
              <label className="ml-1.5 text-xs text-gray-700"> {/* ml-1.5 text-xs */}
                Rester connecté
              </label>
            </div>
            <Link
              to="/reset-password"
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline" /* text-xs */
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Bouton de connexion */}
          <div className="pt-1.5"> {/* pt-1.5 au lieu de pt-2 */}
            <Button
              type="submit"
              className="w-full py-2 bg-gradient-to-br from-indigo-500 to-purple-600 
               hover:from-indigo-600 hover:to-purple-700 
               text-white font-medium rounded-lg shadow transition text-sm" /* py-2 text-sm */
            >
              Se connecter
            </Button>
          </div>
        </div>
      </form>

      {/* Lien d'inscription */}
      <div className="mt-3 pt-3 border-t border-gray-200 text-center"> {/* mt-3 pt-3 */}
        <p className="text-gray-600 text-xs"> {/* text-xs */}
          Vous n'avez pas de compte ?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-800 font-medium text-xs"
          >
            S'inscrire
          </Link>
        </p>
      </div>

      {/* Boutons d'accès rapide (optionnel, pour le développement) */}
      <div className="mt-3"> {/* mt-3 */}
        <details className="text-center">
          <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700"> {/* text-xs */}
            Accès rapide pour les tests
          </summary>
          <div className="mt-1.5 space-y-1"> {/* mt-1.5 */}
            {STATIC_ACCOUNTS.map((account, index) => (
              <button
                key={account.role}
                type="button"
                onClick={() => fillAccount(index)}
                className="block w-full text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors" /* px-2 py-1 */
              >
                {account.email}
              </button>
            ))}
          </div>
        </details>
      </div>
    </div>
  </div>
);
}