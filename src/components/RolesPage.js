import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from '../../AppStyles';
import Popup from './Popup'; // Adjust the import path as needed

const RolesPage = ({ route }) => {
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
    <View style={styles.container}>
      <Text>Roles and Players Page</Text>
      <Text>Game ID: {gameID}</Text>
      {showPopup && <Popup onRequestClose={() => setShowPopup(false)} />}
    </View>
  );
};

export default RolesPage;
