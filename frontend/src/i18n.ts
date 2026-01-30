// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: { translation: {
    "profile.title": "Mon Profil",
    "profile.subtitle": "Gérez vos informations personnelles et préférences",
    "profile.export": "Exporter données",
    "profile.save": "Sauvegarder",
    "profile.info": "Informations Personnelles",
    "profile.name": "Nom complet",
    "profile.email": "Email",
    "profile.phone": "Téléphone",
    "profile.address": "Adresse",
    "profile.children": "Enfants associés",
    "support.title": "Support & Aide",
    "support.help": "Centre d'aide",
    "support.contact": "Contact support",
    "support.privacy": "Confidentialité",
    "auth.logout": "Déconnexion",
    "settings.language": "Langue",
    "settings.theme": "Thème",
    "theme.auto": "Auto", "theme.light": "Clair", "theme.dark": "Sombre"
  }},
  en: { translation: {
    "profile.title": "My Profile",
    "profile.subtitle": "Manage your personal information and preferences",
    "profile.export": "Export data",
    "profile.save": "Save",
    "profile.info": "Personal Information",
    "profile.name": "Full name",
    "profile.email": "Email",
    "profile.phone": "Phone",
    "profile.address": "Address",
    "profile.children": "Linked children",
    "support.title": "Support & Help",
    "support.help": "Help center",
    "support.contact": "Contact support",
    "support.privacy": "Privacy",
    "auth.logout": "Sign out",
    "settings.language": "Language",
    "settings.theme": "Theme",
    "theme.auto": "Auto", "theme.light": "Light", "theme.dark": "Dark"
  }},
  ar: { translation: {
    "profile.title": "ملفي الشخصي",
    "profile.subtitle": "إدارة معلوماتك وتفضيلاتك",
    "profile.export": "تصدير البيانات",
    "profile.save": "حفظ",
    "profile.info": "معلومات شخصية",
    "profile.name": "الاسم الكامل",
    "profile.email": "البريد الإلكتروني",
    "profile.phone": "الهاتف",
    "profile.address": "العنوان",
    "profile.children": "الأطفال المرتبطون",
    "support.title": "الدعم والمساعدة",
    "support.help": "مركز المساعدة",
    "support.contact": "اتصل بالدعم",
    "support.privacy": "الخصوصية",
    "auth.logout": "تسجيل الخروج",
    "settings.language": "اللغة",
    "settings.theme": "السمة",
    "theme.auto": "تلقائي", "theme.light": "فاتح", "theme.dark": "داكن"
  }},
};

const initial = localStorage.getItem("lang") || "fr";

i18n.use(initReactI18next).init({
  resources,
  lng: initial,
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  localStorage.setItem("lang", lng);
});

export default i18n;
