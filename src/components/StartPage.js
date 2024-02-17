import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../AppStyles';
import { addNewGameToFirestore } from '../../src/utilities/firestoreService';

const StartPage = ({ navigation }) => {
  const [godName, setGodName] = useState('Hesi');
  const [numberOfPlayers, setNumberOfPlayers] = useState(10);
  const [godNameError, setGodNameError] = useState('');
  const [numberOfPlayersError, setNumberOfPlayersError] = useState('');
  const { t } = useTranslation();

  const handleSubmit = () => {
    let isValid = true;

    if (!godName || godName === '') {
      setGodNameError(t('godNameRequired'));
      isValid = false;
    } else {
      setGodNameError('');
    }

    if (!numberOfPlayers || isNaN(numberOfPlayers)) {
      setNumberOfPlayersError(t('numberOfPlayersRequired'));
      isValid = false;
    } else {
      setNumberOfPlayersError('');
    }

    if (isValid) {
      // Call the Firestore function to create a new game document
      addNewGameToFirestore(godName, numberOfPlayers)
        .then((newGameID) => {
          navigation.navigate('game', {
            gameID: newGameID,
          });
        })
        .catch((error) => {
          console.error('Error creating game:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/mafia-silhouette.jpeg')}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('nameOfGodLabel')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('nameOfGodLabel')}
          placeholderTextColor="white"
          value={godName}
          onChangeText={(text) => setGodName(text)}
        />
        <Text style={styles.label}>{t('numberOfPlayers')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('numberOfPlayers')}
          placeholderTextColor="white"
          keyboardType="numeric"
          value={numberOfPlayers}
          onChangeText={(text) => setNumberOfPlayers(text)}
        />
        {godNameError ? <Text style={styles.error}>{godNameError}</Text> : null}
        {numberOfPlayersError ? (
          <Text style={styles.error}>{numberOfPlayersError}</Text>
        ) : null}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{t('createNewGame')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartPage;
