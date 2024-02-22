import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const GamePopup = ({
  onRequestClose,
  origGameID,
  callBackSetEnteredGame,
  callBackSetEnteredName,
}) => {
  const [playerName, setPlayerName] = useState('');
  const [enteredGameID, setEnteredGameID] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (!enteredGameID) {
      setErrorMessage(t('errorPlayerName'));
      return;
    }
    if (origGameID !== enteredGameID) {
      setErrorMessage(t('errorGameID'));
      return;
    }
    setEnteredGameID(enteredGameID);
    callBackSetEnteredGame(enteredGameID);
    callBackSetEnteredName(playerName);

    onRequestClose(); // Close the popup after submission
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{t('gamePopEnterName')}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPlayerName}
            value={playerName}
            placeholder={t('name')}
            placeholderTextColor="#999"
          />
          <Text style={styles.modalText}>{t('gamePopGameID')}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEnteredGameID}
            value={enteredGameID}
            placeholder={t('gamePageGameID')}
            placeholderTextColor="#999"
          />
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.textStyle}>{t('submit')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'left',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderRadius: 5,
    borderColor: '#ddd',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default GamePopup;
