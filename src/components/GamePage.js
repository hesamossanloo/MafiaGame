import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { getGameInfo } from '../utilities/firestoreService';
import styles from './GamePageStyles';
import GamePopup from './GamePopup';

const GamePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [enteredGameID, setEnteredGameID] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [fetchedGameInfo, setFetchedGameInfo] = useState('');
  const [thisIsGod, setThisIsGod] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const storedGodName = window.localStorage.getItem('godName');
    if (storedGodName) {
      const storedGodGeneratedGameId =
        window.localStorage.getItem('godGeneratedGameID');
      setPlayerName(storedGodName);
      setEnteredGameID(storedGodGeneratedGameId);
      setThisIsGod(true);
      getGameInfo(storedGodGeneratedGameId)
        .then((info) => {
          setFetchedGameInfo(info);
        })
        .catch((error) => {
          console.error('Error fetching game info:', error);
        });
    }

    if (thisIsGod) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  }, [thisIsGod, fetchedGameInfo]);

  return (
    <View style={styles.gamePageContainer}>
      {fetchedGameInfo && (
        <>
          <Text style={styles.title}>
            {thisIsGod ? t('godTitle') : t('playerTitle')}
          </Text>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.tableRows}>{t('godName')}:</td>
                <td style={styles.tableRows}>{fetchedGameInfo.godName}</td>
              </tr>
              {!thisIsGod && (
                <tr>
                  <td style={styles.tableRows}>{t('gamePagePlayerName')}:</td>
                  <td style={styles.tableRows}>{playerName}</td>
                </tr>
              )}
              <tr>
                <td style={styles.tableRows}>{t('gamePageGameID')}:</td>
                <td style={styles.tableRows}>{enteredGameID}</td>
              </tr>
              <tr>
                <td style={styles.tableRows}>{t('gameNumAlivePlayers')}:</td>
                <td style={styles.tableRows}>
                  {fetchedGameInfo.alivePlayers.length} out of{' '}
                  {fetchedGameInfo.numberOfPlayers}
                </td>
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
        />
      )}
    </View>
  );
};

export default GamePage;
