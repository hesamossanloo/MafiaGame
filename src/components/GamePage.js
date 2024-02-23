import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import styles from './GamePageStyles';
import GamePopup from './GamePopup';

const GamePage = ({ route }) => {
  const { gameID } = route.params;
  const [showPopup, setShowPopup] = useState(false);
  const [enteredGameID, setEnteredGameID] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Clear local storage when the browser or tab is closed
    window.onbeforeunload = () => {
      window.localStorage.clear();
    };
    // Attempt to read enteredGameID, player's name and its confirmation state from local storage
    const storedGameID = window.localStorage.getItem('enteredGameID');
    const storedPlayerName = window.localStorage.getItem('playerName');
    const isConfirmed =
      window.localStorage.getItem('isGameIDConfirmed') === 'true'; // Ensure to compare with string 'true'

    if (storedGameID && isConfirmed && storedGameID === gameID) {
      setEnteredGameID(storedGameID);
      setPlayerName(storedPlayerName);
      setShowPopup(false); // If confirmed and matches, don't show popup
    } else {
      setShowPopup(true); // Otherwise, show popup to enter gameID
    }
    // Cleanup the event listener
    return () => {
      window.onbeforeunload = null;
    };
  }, [gameID]);

  useEffect(() => {
    if (enteredGameID === gameID) {
      // Save enteredGameID and its confirmation state to local storage
      window.localStorage.setItem('enteredGameID', enteredGameID);
      window.localStorage.setItem('playerName', playerName);
      window.localStorage.setItem('isGameIDConfirmed', 'true');
    }
  }, [enteredGameID, gameID, playerName]);

  return (
    <View style={styles.gamePageContainer}>
      <Text style={styles.text}>
        {gameID === 'join' ? t('playerTitle') : t('godTitle')}
      </Text>
      {enteredGameID && (
        <>
          <Text style={styles.text}>
            {t('gamePagePlayerName')}: {playerName}
          </Text>
          <Text style={styles.text}>
            {t('gamePageGameID')}: {gameID}
          </Text>
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
