import React from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Text, View } from 'react-native';
import styles from '../../AppStyles';

const CustomHeader = (route, isEnabled, toggleSwitch) => {
  const { t } = useTranslation();

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
  return (
    <View
      style={[
        styles.languageSwitch,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      ]}
    >
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.flag}>🇬🇧</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={styles.flag}>🇮🇷</Text>
      </View>
    </View>
  );
};

export default CustomHeader;
