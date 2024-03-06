import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  Modal,
  Picker,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../AppStyles';
import {
  addNewGameToFirestore,
  getGameScenarios,
} from '../utilities/firestoreService';
import {
  clearLocalStorageStartPage,
  setLocalStorageStartPage,
} from '../utilities/functions';

// Get screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const StartPage = ({ navigation }) => {
  const { t } = useTranslation();

  // Form Data
  const [godName, setGodName] = useState('Hesi');
  const [scenario, setScenario] = useState('');
  const [allScenarios, setAllScenarios] = useState(null);
  const [numberOfPlayers, setNumberOfPlayers] = useState(10);

  // Modal and New Game ID Handling
  const [showModal, setShowModal] = useState(false);
  const [godGeneratedGameID, setGodGeneratedGameID] = useState('');

  // Errors
  const [godNameError, setGodNameError] = useState('');
  const [numberOfPlayersError, setNumberOfPlayersError] = useState('');
  const [scenarioError, setScenarioError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scenarios = await getGameScenarios();
        setAllScenarios(scenarios);
        // Do something with the scenarios
      } catch (error) {
        console.error('Error getting scenarios:', error);
      }
    };

    fetchData();
  }, []);

  const handleNewGame = () => {
    let isValid = true;

    if (!godName || godName === '') {
      setGodNameError(t('errorGodNameRequired'));
      isValid = false;
    } else {
      setGodNameError('');
    }

    if (!numberOfPlayers || isNaN(numberOfPlayers)) {
      setNumberOfPlayersError(t('errorNumberOfPlayersRequired'));
      isValid = false;
    } else {
      setNumberOfPlayersError('');
    }

    if (!scenario) {
      setScenarioError(t('errorScenarioRequired'));
      isValid = false;
    } else {
      setScenarioError('');
    }

    if (isValid) {
      // Call the Firestore function to create a new game document
      addNewGameToFirestore(godName, numberOfPlayers)
        .then((gameID) => {
          setGodGeneratedGameID(gameID);
          setShowModal(true);
          setLocalStorageStartPage(gameID, godName, scenario);
        })
        .catch((error) => {
          console.error('Error creating game:', error);
        });
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(godGeneratedGameID);
  };

  const handleContinue = () => {
    setShowModal(false);
    navigation.navigate('game');
  };

  const handleJoinGame = () => {
    setShowModal(false);
    clearLocalStorageStartPage();
    navigation.navigate('game');
  };

  const btnJoin = {
    marginTop: 15,
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/mafia-silhouette.jpeg')}
        style={[
          styles.logo,
          { width: screenWidth * 0.8, height: screenHeight * 0.3 },
        ]}
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
        <Text style={styles.label}>Select the scenario:</Text>
        <Picker
          selectedValue={scenario.id}
          style={styles.input}
          onValueChange={(itemValue) => {
            const selectedScenario = allScenarios.find(
              (s) => s.id === itemValue,
            );
            setScenario(selectedScenario);
          }}
        >
          <Picker.Item label="Select a scenario" value="" />
          {allScenarios &&
            allScenarios.map((s) => (
              <Picker.Item
                key={s.id}
                label={s.id.charAt(0).toUpperCase() + s.id.slice(1)}
                value={s.id}
              />
            ))}
        </Picker>
        {godNameError ? <Text style={styles.error}>{godNameError}</Text> : null}
        {numberOfPlayersError ? (
          <Text style={styles.error}>{numberOfPlayersError}</Text>
        ) : null}
        {scenarioError ? (
          <Text style={styles.error}>{scenarioError}</Text>
        ) : null}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNewGame}>
          <Text style={styles.buttonText}>{t('createNewGame')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, btnJoin]}
          onPress={handleJoinGame}
        >
          <Text style={styles.buttonText}>{t('joinGame')}</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalInputCopyContainer}>
              <TextInput
                style={styles.input}
                value={godGeneratedGameID}
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
              <Text style={styles.buttonText}>{t('continue')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StartPage;
