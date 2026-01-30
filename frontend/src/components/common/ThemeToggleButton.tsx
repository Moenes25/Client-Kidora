import { useMemo } from "react";
import { useTheme } from "../../context/ThemeContext";

/**
 * Bouton de bascule thème avec:
 * - UI cohérente au header (bg blanc translucide, anneau focus)
 * - Icônes soleil/lune superposées + transition douce
 * - ARIA (aria-pressed, label dynamique) + title
 * - Respect de prefers-reduced-motion via classes Tailwind
 */
export const ThemeToggleButton: React.FC = () => {
  const ctx = useTheme();
  const theme = (ctx as any)?.theme as "light" | "dark" | undefined;
  const toggleTheme = ctx?.toggleTheme ?? (() => {});

  // Fallback si le contexte n’expose pas `theme`
  const isDark = useMemo(() => {
    if (theme) return theme === "dark";
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "Passer en thème clair" : "Passer en thème sombre"}
      title={isDark ? "Mode clair" : "Mode sombre"}
      className={[
        "relative inline-grid place-items-center size-11 rounded-full",
        "bg-white/10 hover:bg-white/20 text-white",
        "focus:outline-none focus:ring-2 focus:ring-white/40",
        "transition-colors"
      ].join(" ")}
    >
      {/* Soleil (clair) */}
      <svg
        viewBox="0 0 20 20"
        className={[
          "absolute h-5 w-5 transform transition",
          "motion-safe:duration-300 motion-safe:ease-out",
          isDark ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
        ].join(" ")}
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M10 6.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7Zm0-3.5a.75.75 0 0 1 .75.75V5a.75.75 0 0 1-1.5 0V3.75A.75.75 0 0 1 10 3Zm0 12a.75.75 0 0 1 .75.75V17a.75.75 0 0 1-1.5 0v-1.25A.75.75 0 0 1 10 15Zm7-5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1 0-1.5h1.25A.75.75 0 0 1 17 10ZM5 10a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h1.25A.75.75 0 0 1 5 10Zm9.54-4.04a.75.75 0 1 1 1.06-1.06l.88.88a.75.75 0 1 1-1.06 1.06l-.88-.88Zm-9.06 9.06a.75.75 0 1 1 1.06-1.06l.88.88a.75.75 0 1 1-1.06 1.06l-.88-.88Zm10.12 1.06a.75.75 0 0 1-1.06 0l-.88-.88a.75.75 0 1 1 1.06-1.06l.88.88a.75.75 0 0 1 0 1.06ZM6.4 5.96a.75.75 0 0 1-1.06 0l-.88-.88A.75.75 0 1 1 5.52 4.02l.88.88a.75.75 0 0 1 0 1.06Z"
        />
      </svg>

      {/* Lune (sombre) */}
      <svg
        viewBox="0 0 20 20"
        className={[
          "absolute h-5 w-5 transform transition",
          "motion-safe:duration-300 motion-safe:ease-out",
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
        ].join(" ")}
        aria-hidden="true"
      >
        {/* croissant lisible */}
        <path
          fill="currentColor"
          d="M12.91 3.07a.8.8 0 0 1 .9 1.09A6.5 6.5 0 1 0 15.84 14a.8.8 0 0 1 1.1.91A8.1 8.1 0 1 1 12.91 3.07Z"
        />
      </svg>

      <span className="sr-only">
        {isDark ? "Désactiver le thème sombre" : "Activer le thème sombre"}
      </span>
    </button>
  );
};
