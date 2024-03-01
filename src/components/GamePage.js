import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { getGameDocSnapshot } from '../utilities/firestoreService';
import styles from './GamePageStyles';
import GamePopup from './GamePopup';

const GamePage = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [enteredGameID, setEnteredGameID] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [fetchedGameInfo, setFetchedGameInfo] = useState('');
  const [thisIsGod, setThisIsGod] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetchedGameInfo) {
      setShowPopup(false);
    }
    console.log(1, error);
  }, [fetchedGameInfo, showPopup, error]);

  useEffect(() => {
    const storedGodName = window.localStorage.getItem('godName');
    if (storedGodName) {
      const storedGodGeneratedGameId =
        window.localStorage.getItem('godGeneratedGameID');
      const fetchGameInfo = async () => {
        setPlayerName(storedGodName);
        setEnteredGameID(storedGodGeneratedGameId);
        setThisIsGod(true);
        try {
          const gameDocSnap = await getGameDocSnapshot(
            storedGodGeneratedGameId,
          );
          if (gameDocSnap.exists()) {
            setFetchedGameInfo(gameDocSnap.data());
          } else {
            console.error('The entered Game ID does not exist!');
            setError('The entered Game ID does not exist!');
            setIsLoading(false);
          }
        } catch (err) {
          console.error('Error fetching game info:', err);
          setError('Error fetching game info!');
          setIsLoading(false);
        }
      };
      fetchGameInfo();
    }

    if (thisIsGod) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  }, [thisIsGod, fetchedGameInfo, error]);

  const handleGameIdSubmit = async (gameId) => {
    setIsLoading(true);
    setError(null);

    // Fetch the Game Info from DB
    try {
      const gameDocSnap = await getGameDocSnapshot(gameId);
      if (gameDocSnap.exists()) {
        setFetchedGameInfo(gameDocSnap.data());
        setIsLoading(false);
        setShowPopup(false);
      } else {
        console.error('The entered Game ID does not exist!');
        setError('The entered Game ID does not exist!');
        setFetchedGameInfo(null);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error fetching game info:', err);
      setError('The entered Game ID does not exist!');
      setIsLoading(false);
    }
  };

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
          visible={showPopup}
          isLoading={isLoading}
          error={error}
          onRequestClose={() => {
            setShowPopup(false); // Close the popup when the user manually closes it
            setError(null); // Reset the error state
          }}
          onSubmit={handleGameIdSubmit}
        />
      )}
    </View>
  );
};

export default GamePage;
