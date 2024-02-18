import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const GamePopup = ({ onRequestClose }, gameID) => {
  const [playerName, setPlayerName] = useState('');
  const [enteredGameID, setEnteredGameID] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    if (gameID !== enteredGameID) {
      setErrorMessage('Entered GameID does not match the expected GameID.');
      return;
    }

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
          <Text style={styles.modalText}>Enter Your Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPlayerName}
            value={playerName}
            placeholder="Name"
            placeholderTextColor="#999"
          />
          <Text style={styles.modalText}>Enter the Game ID</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEnteredGameID}
            value={playerName}
            placeholder="Game ID"
            placeholderTextColor="#999"
          />
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.textStyle}>Submit</Text>
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
  },
});

export default GamePopup;
