import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const PopUp = ({ onRequestClose }) => {
  const [playerName, setPlayerName] = useState('');
  const [gameID, setGameID] = useState('');

  const handleSubmit = () => {
    // Here, you can handle the submission of the player's name
    // For example, send it to Firestore or manage it within the app's state
    console.log('Player Name:', playerName);
    console.log('GameID: :', gameID);
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
            onChangeText={setGameID}
            value={playerName}
            placeholder="Game ID"
            placeholderTextColor="#999"
          />
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
});

export default PopUp;
