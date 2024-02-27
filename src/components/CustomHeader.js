import React from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../AppStyles';

const CustomHeader = ({ route, isEnabled, toggleSwitch }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  let title;
  switch (route.name) {
    case 'start':
      title = t('startPageTitle');
      break;
    case 'game':
      title = t('rolesPageTitle');
      break;
    // Add more cases as needed
    default:
      title = 'Mafia Game';
  }
  const containerStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  const rowStyle = {
    flexDirection: 'row',
    alignItems: 'center',
  };

  const flagStyle = {
    marginRight: 5, // Add this
  };

  const flagStyle2 = {
    marginLeft: 5, // Add this
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (route.name === 'start') {
    return null; // Do not render the header on the start page
  }

  return (
    <View style={[styles.languageSwitch, containerStyle]}>
      <TouchableOpacity onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={rowStyle}>
        <Text style={[styles.flag, flagStyle]}>🇬🇧</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={[styles.flag, flagStyle2]}>🇮🇷</Text>
      </View>
    </View>
  );
};

export default CustomHeader;
