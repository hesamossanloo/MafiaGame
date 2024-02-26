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
  const [gameExists, setGameExists] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Attempt to read enteredGameID, player's name and its confirmation state from local storage
    const storedGameID = window.localStorage.getItem('enteredGameID');
    const storedPlayerName = window.localStorage.getItem('playerName');
    const isConfirmed =
      window.localStorage.getItem('isGameIDConfirmed') === 'true'; // Ensure to compare with string 'true'

    if (storedGameID && isConfirmed) {
      setEnteredGameID(storedGameID);
      setGameExists(true);
      setPlayerName(storedPlayerName);
      setShowPopup(false); // If confirmed and matches, don't show popup
    } else {
      setShowPopup(true); // Otherwise, show popup to enter gameID
    }
  }, [gameID]);

  useEffect(() => {
    if (gameExists) {
      // Save enteredGameID and its confirmation state to local storage
      window.localStorage.setItem('enteredGameID', enteredGameID);
      window.localStorage.setItem('playerName', playerName);
      window.localStorage.setItem('isGameIDConfirmed', 'true');
    }
  }, [enteredGameID, gameID, playerName, gameExists]);

  return (
    <View style={styles.gamePageContainer}>
      <Text style={styles.text}>
        {gameID === 'join' ? t('playerTitle') : t('godTitle')}
      </Text>
      {enteredGameID && (
        <>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.tableRows}>{t('gamePagePlayerName')}:</td>
                <td style={styles.tableRows}>{playerName}</td>
              </tr>
              <tr>
                <td style={styles.tableRows}>{t('gamePageGameID')}:</td>
                <td style={styles.tableRows}>{gameID}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      {showPopup && (
        <GamePopup
          onRequestClose={() => setShowPopup(false)}
          callBackSetEnteredGameID={setEnteredGameID}
          callBackSetEnteredPlayerName={setPlayerName}
          callBackSetGameExists={setGameExists}
        />
      )}
    </View>
  );
};

export default GamePage;
