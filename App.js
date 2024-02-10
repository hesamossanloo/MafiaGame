import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Text, Switch } from 'react-native';
import i18n from './src/utilities/i18n'; // Updated path
import styles from './AppStyles'; // Adjust the path as needed

const App = () => {
  const [isEnabled, setIsEnabled] = useState(i18n.language === 'fa');
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
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
    <View style={styles.container}>
      {/* Language Switch positioned at the top right */}
      <View style={styles.languageSwitch}>
        <Text style={styles.flag}>🇬🇧</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={styles.flag}>🇮🇷</Text>
      </View>

      <Image source={require('./assets/mafia-silhouette.jpeg')} style={styles.logo} />
      <Text style={styles.label}>{i18n.t('nameOfGodLabel')}</Text>
      <TextInput
        style={styles.input}
        placeholder={i18n.t('nameOfGodLabel')}
        placeholderTextColor="white"
      />
    </View>
  );
};

export default App;

