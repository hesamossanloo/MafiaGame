import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const GamePopup = ({ visible, isLoading, error, onRequestClose, onSubmit }) => {
  const [playerName, setPlayerName] = useState('');
  const [enteredGameID, setEnteredGameID] = useState('');
  const { t } = useTranslation();

  console.log(2, error);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Text style={styles.modalText}>{t('gamePopGameID')}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEnteredGameID}
                value={enteredGameID}
                placeholder={t('gamePageGameID')}
                placeholderTextColor="#999"
              />
              <Text style={styles.modalText}>{t('gamePopEnterName')}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPlayerName}
                value={playerName}
                placeholder={t('name')}
                placeholderTextColor="#999"
              />
              {error && <Text style={styles.errorMessage}>{error}</Text>}
              <TouchableOpacity
                style={styles.button}
                onPress={() => onSubmit(enteredGameID)}
              >
                <Text style={styles.textStyle}>{t('submit')}</Text>
              </TouchableOpacity>
            </>
          )}
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
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
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
