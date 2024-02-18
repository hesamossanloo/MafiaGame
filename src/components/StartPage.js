import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../AppStyles';
import { addNewGameToFirestore } from '../../src/utilities/firestoreService';

const StartPage = ({ navigation }) => {
  const { t } = useTranslation();
  const [godName, setGodName] = useState('Hesi');
  const [numberOfPlayers, setNumberOfPlayers] = useState(10);
  const [godNameError, setGodNameError] = useState('');
  const [numberOfPlayersError, setNumberOfPlayersError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newGameID, setNewGameID] = useState('');

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
        .then((gameID) => {
          setNewGameID(gameID);
          setShowModal(true);
        })
        .catch((error) => {
          console.error('Error creating game:', error);
        });
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(newGameID);
  };

  const handleContinue = () => {
    setShowModal(false);
    navigation.navigate('game', {
      gameID: newGameID,
    });
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
      <Modal visible={showModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalInputCopyContainer}>
              <TextInput
                style={styles.input}
                value={newGameID}
                editable={false}
              />
              <TouchableOpacity
                style={styles.copyButton}
                onPress={copyToClipboard}
              >
                <Feather name="copy" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleContinue}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StartPage;
