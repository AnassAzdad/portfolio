import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "nl" ? "en" : "nl")}
      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition"
    >
      {language === "nl" ? "English" : "Nederlands"}
    </button>
  );
}
