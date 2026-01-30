import { StrictMode, Suspense  } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import "./i18n";                 // ⬅️ charge i18n une fois
import i18n from "./i18n";       // ⬅️ pour initialiser html au 1er rendu

(() => {
  const lang = localStorage.getItem("lang") || "fr";
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
})();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <Suspense fallback={<div style={{padding:16}}>…</div>}>
    <ThemeProvider>
      <AuthProvider>     
         <AppWrapper>
        <App />
      </AppWrapper>
      </AuthProvider>
    </ThemeProvider>
    </Suspense>
  </StrictMode>,
);
