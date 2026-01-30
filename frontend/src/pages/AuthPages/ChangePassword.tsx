
import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import Button from "../../components/ui/button/Button";
import { useAuth } from "../../context/AuthContext";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { changePassword } = useAuth() as any; // branche si dispo dans ton AuthContext

  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({cur:false, n:false, c:false});

  const validate = () => {
    if (!currentPwd || !newPwd || !confirmPwd) return "Remplis tous les champs.";
    if (newPwd.length < 8) return "Le nouveau mot de passe doit contenir au moins 8 caractères.";
    if (newPwd !== confirmPwd) return "Les mots de passe ne correspondent pas.";
    if (newPwd === currentPwd) return "Le nouveau mot de passe doit être différent de l’actuel.";
    return "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); setOk("");
    const v = validate();
    if (v) return setError(v);

    try {
      setLoading(true);

      // Si ton AuthContext expose changePassword(current, next)
      if (typeof changePassword === "function") {
        await changePassword(currentPwd, newPwd);
      } else {
        // fallback demo – remplace par ton appel API
        await new Promise(r => setTimeout(r, 800));
      }

      setOk("Mot de passe modifié avec succès.");
      setTimeout(() => navigate("/parent/profil"), 900);
    } catch (err: any) {
      setError(err?.message || "Impossible de changer le mot de passe.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <>
      <PageMeta
        title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-950 dark:to-slate-900 px-4 rounded-lg">
      <div className="w-full max-w-sm">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100
                        dark:bg-slate-900 dark:border-white/10 dark:supports-[backdrop-filter]:bg-slate-900/60">
          {/* Logo */}
          <div className="text-center mb-6">
            <img
              src="/images/logo/logo_kidora.png"
              alt="KIDORA"
              className="w-24 h-24 mx-auto object-contain"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = "none";
              }}
            />
            <h1 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">Changer le mot de passe</h1>
            <p className="text-sm text-gray-600 dark:text-white/70">Pour des raisons de sécurité, saisis ton mot de passe actuel.</p>
          </div>

          {error && (
            <div className="mb-3 p-2 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200
                            dark:text-red-300 dark:bg-red-900/20 dark:border-red-800/30">
              {error}
            </div>
          )}
          {ok && (
            <div className="mb-3 p-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200
                            dark:text-emerald-300 dark:bg-emerald-900/20 dark:border-emerald-800/30">
              {ok}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* actuel */}
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">Mot de passe actuel</label>
              <div className="relative">
                <input
                  type={show.cur ? "text" : "password"}
                  value={currentPwd}
                  onChange={e=>setCurrentPwd(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             dark:border-white/10 dark:bg-gray-900 dark:text-white dark:focus:ring-white/10"
                />
                <button
                  type="button"
                  onClick={()=>setShow(s=>({...s, cur:!s.cur}))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-white/70"
                >
                  {show.cur ? "Masquer" : "Afficher"}
                </button>
              </div>
            </div>

            {/* nouveau */}
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">Nouveau mot de passe</label>
              <div className="relative">
                <input
                  type={show.n ? "text" : "password"}
                  value={newPwd}
                  onChange={e=>setNewPwd(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             dark:border:white/10 dark:bg-gray-900 dark:text-white dark:focus:ring-white/10"
                />
                <button
                  type="button"
                  onClick={()=>setShow(s=>({...s, n:!s.n}))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-white/70"
                >
                  {show.n ? "Masquer" : "Afficher"}
                </button>
              </div>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-white/60">
                Minimum 8 caractères. Utilise des lettres et des chiffres.
              </p>
            </div>

            {/* confirmation */}
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">Confirmer le nouveau</label>
              <div className="relative">
                <input
                  type={show.c ? "text" : "password"}
                  value={confirmPwd}
                  onChange={e=>setConfirmPwd(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             dark:border-white/10 dark:bg-gray-900 dark:text-white dark:focus:ring-white/10"
                />
                <button
                  type="button"
                  onClick={()=>setShow(s=>({...s, c:!s.c}))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-white/70"
                >
                  {show.c ? "Masquer" : "Afficher"}
                </button>
              </div>
            </div>

            <div className="pt-1.5">
              <Button
                type="submit"
                className={`w-full py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow transition text-sm
                           ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "En cours..." : "Valider"}
              </Button>
            </div>

            <div className="text-center">
              <Link to="/parent/profil" className="text-xs text-blue-600 hover:underline">
                ← Retour au profil
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </AuthLayout>
        </>
  );
}
