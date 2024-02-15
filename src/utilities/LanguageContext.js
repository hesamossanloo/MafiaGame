import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from './i18n'; // Adjust the import path as needed

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(i18n.language === 'fa');

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    const newLang = isEnabled ? 'en' : 'fa';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleLangChange = () => {
      setIsEnabled(i18n.language === 'fa');
    };

    i18n.on('languageChanged', handleLangChange);
    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ isEnabled, toggleSwitch }}>
      {children}
    </LanguageContext.Provider>
  );
};
