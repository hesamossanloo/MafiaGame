import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './GamePageStyles';
import GamePopup from './GamePopup';

const GamePage = ({ route }) => {
  const { gameID } = route.params;
  const [showPopup, setShowPopup] = useState(false);
  const [enteredGameID, setEnteredGameID] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'POP') {
        // Prevent navigation back to StartPage on refresh
        navigation.navigate(e.data.route.name); // Stay on GamePage
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    // Example logic to decide if the popup should be shown
    // This could be expanded based on how you verify active game sessions
    if (gameID && !enteredGameID) {
      setShowPopup(true);
    }
  }, [gameID, enteredGameID]);

  return (
    <View style={styles.gamePageContainer}>
      {enteredGameID && (
        <>
          <Text style={styles.text}>Player's Name: {playerName}</Text>
          <Text style={styles.text}>Game ID: {gameID}</Text>
        </>
      )}
      {showPopup && (
        <GamePopup
          origGameID={gameID}
          onRequestClose={() => setShowPopup(false)}
          callBackSetEnteredGame={setEnteredGameID}
          callBackSetEnteredName={setPlayerName}
        />
      )}
    </View>
  );
};

export default GamePage;
