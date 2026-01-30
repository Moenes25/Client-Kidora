import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

import { useAuth } from "../../context/AuthContext";
import { RoleUsers } from "../../types/auth.types";



export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const { login, isLoading, error: authError, clearError } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    clearError();

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    // validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer un email valide");
      return;
    }

    try {
      const response = await login({ email, password });
      
      if (isChecked) {
        localStorage.setItem("rememberedEmail", email);
 
      } else {
        localStorage.removeItem("rememberedEmail");
      }
       switch (response.role) {
        case RoleUsers.PARENT:
          navigate("/parent");
          break;
        case RoleUsers.EDUCATEUR:
          navigate("/educateur");
          break;
        case RoleUsers.ADMIN:
          navigate("/admin");
          break;
        default:
          navigate("/signin");
          break;
      }
       
    } catch (err : any) {
      setError(err.message || "Email ou mot de passe incorrect");
      console.error("Erreur de connexion:", err);
    }

  };
   
  const fillTestAccount = (account :{email : string, password : string}) => {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  }
  const testAccounts = [
    {
      nom: "Admin",
      email: "admin@kidora.com",
      password: "Admin123!",
      role: RoleUsers.ADMIN
    },
    {
      nom: "Éducateur",
      email: "fatma.benahmed@educ.tn",
      password: "educTN123",
      role: RoleUsers.EDUCATEUR
    },
    {
      nom: "Parent",
      email: "mohamed.benali@example.tn",
      password: "parent123",
      role: RoleUsers.PARENT
    }
  ];


  return (
  <div className="w-full max-w-sm mx-auto">
    {/* Carte du formulaire avec hauteur réduite */}
    <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 dark:supports-[backdrop-filter]:bg-gray-900/60"> {/* p-5 au lieu de p-6 */}
      {/* Message d'erreur */}
      {(error && authError) &&(
        <div className="mb-3 p-2 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200 dark:text-red-300 dark:bg-red-900/20 dark:border-red-800/30"> {/* mb-3 p-2 */}
          {error || authError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4"> {/* space-y-4 au lieu de space-y-5 */}
          
          {/* Logo avec espace réduit */}
   <div className="text-center mb-6">
  <div className="inline-flex items-center justify-center mb-2"> {/* Changé de mb-4 à mb-2 */}
    <img 
      src="/images/logo/logo_kidora.png"
      alt="KIDORA Logo" 
      className="w-36 h-36 object-contain" 
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
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="superadmin@kidora.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm dark:border-white/10 dark:bg-gray-900 dark:text-white
                         dark:placeholder:text-white/50 dark:focus:ring-white/10" /* py-2 au lieu de py-2.5 */
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-1"> {/* space-y-1 au lieu de space-y-1.5 */}
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="......"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white tracking-widest pr-10 text-sm  dark:border-white/10 dark:bg-gray-900 dark:text-white dark:focus:ring-white/10" /* py-2 au lieu de py-2.5 */
              />
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm dark:text-white " /* right-2 au lieu de right-3 */
              >
                {showPassword ? (
                  <EyeIcon className="h-4 w-4 dark:text-white" /> 
                ) : (
                  <EyeCloseIcon className="h-4 w-4 " /> 
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
                disabled={isLoading}
                className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-white/20" /* h-3.5 w-3.5 */
              />
              <label className="ml-1.5 text-xs text-gray-700 dark:text-white/80"> {/* ml-1.5 text-xs */}
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
              disabled={isLoading}
              className={`w-full py-2 bg-gradient-to-br from-indigo-500 to-purple-600 
               hover:from-indigo-600 hover:to-purple-700 
               text-white font-medium rounded-lg shadow transition text-sm" /* py-2 text-sm */
               ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion...
                  </span>
                ) : (
                  'Se connecter'
                )}
            </Button>
          </div>
        </div>
      </form>

      {/* Lien d'inscription */}
      <div className="mt-3 pt-3 border-t border-gray-200 text-center"> {/* mt-3 pt-3 */}
        <p className="text-gray-600 text-xs dark:text-white/60 dark:hover:text-white/80"> {/* text-xs */}
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
          <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 dark:text-white/60 dark:hover:text-white/80"> {/* text-xs */}
            Accès rapide pour les tests
          </summary>
          <div className="mt-1.5 space-y-1"> {/* mt-1.5 */}
            {testAccounts.map((account, index) => (
              <button
                key={account.role}
                type="button"
                onClick={() => fillTestAccount(account)}
                disabled={isLoading}
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