import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './GamePageStyles';
import GamePopup from './GamePopup';

const GamePage = ({ route }) => {
  const { gameID } = route.params;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Example logic to decide if the popup should be shown
    // This could be expanded based on how you verify active game sessions
    if (gameID) {
      setShowPopup(true);
    }
  }, [gameID]);

  return (
    <View style={styles.gamePageContainer}>
      {gameID && (
        <>
          <Text style={styles.text}>Roles and Players Page</Text>
          <Text style={styles.text}>Game ID: {gameID}</Text>
        </>
      )}
      {showPopup && <GamePopup gameID onRequestClose={() => setShowPopup(false)} />}
    </View>
  );
};

export default GamePage;
