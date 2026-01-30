// src/utils/lang.ts
import i18n from "../i18n";
export function setAppLanguage(lng: "fr"|"en"|"ar") {
  i18n.changeLanguage(lng);
}
