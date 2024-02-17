import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import CustomHeader from './src/components/CustomHeader';
import GamePage from './src/components/GamePage';
import StartPage from './src/components/StartPage';
import i18n from './src/utilities/i18n'; // Updated path

const Stack = createStackNavigator();

const App = () => {
  const [isEnabled, setIsEnabled] = useState(i18n.language === 'fa');

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    const newLang = isEnabled ? 'en' : 'fa';
    i18n.changeLanguage(newLang);
  };

  const renderCustomHeader = ({ route }) => (
    <CustomHeader
      route={route}
      isEnabled={isEnabled}
      toggleSwitch={toggleSwitch}
    />
  );

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
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: renderCustomHeader,
        }}
      >
        <Stack.Screen name="start" component={StartPage} />
        <Stack.Screen name="game" component={GamePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
