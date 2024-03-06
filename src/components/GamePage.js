import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  getGameDocSnapshot,
  updateDocAlivePlayers,
} from '../utilities/firestoreService';
import styles from './GamePageStyles';
import GamePopup from './GamePopup';

const GamePage = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [gameID, setGameID] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [fetchedGameData, setFetchedGameData] = useState('');
  const [thisIsGod, setThisIsGod] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scenario, setScenario] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetchedGameData && !error) {
      setShowPopup(false);
    }
  }, [fetchedGameData, showPopup, error]);

  const fetchGameInfo = async (enteredGameID) => {
    try {
      const gameDocSnap = await getGameDocSnapshot(enteredGameID);
      if (gameDocSnap.exists()) {
        setFetchedGameData(gameDocSnap.data());
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

  useEffect(() => {
    setThisIsGod(false);
    // If this is God, then this localstorage variable would return a value,
    // if not then it would be empty
    const storedGodName = window.localStorage.getItem('godName');
    if (storedGodName) {
      const storedGodGeneratedGameId =
        window.localStorage.getItem('godGeneratedGameID');

      const s = window.localStorage.getItem('scenario');
      setScenario(JSON.parse(s));
      setPlayerName(storedGodName);
      setGameID(storedGodGeneratedGameId);
      setThisIsGod(true);
      setShowPopup(false);

      // Because it is a promise, it is recommended to call it like this
      fetchGameInfo(storedGodGeneratedGameId);
    } else {
      setShowPopup(true);
    }
  }, []);

  const handleGameIdSubmit = async (enteredGameId, enteredPlayername) => {
    setIsLoading(true);
    setError(null);

    // Fetch the Game Info from DB
    try {
      const gameDocSnap = await getGameDocSnapshot(enteredGameId);
      if (gameDocSnap.exists()) {
        // STEP 1
        // Update the state of the GameData
        // STEP 2
        // Update the variables' states
        setGameID(enteredGameId);
        setIsLoading(false);
        setShowPopup(false);
        setFetchedGameData(gameDocSnap.data());
        setPlayerName(enteredPlayername);
        // STEP 3
        // Validate if already exists, unless add the player name to the list of active players
        // even though we have set the fetchedGameData, earlier, we have to use the
        // We have to use the gameDocSnap.data(), because the useSatet will update the value first
        // after rerendering the component. So if we get the fetchedGameData..alivePlayers, it will show
        // th eold value which is null or empty.
        if (gameDocSnap.data().alivePlayers.includes(enteredPlayername)) {
          console.error('errorPlayerExists');
          setError(t('errorPlayerExists'));
        }
        if (
          // Check if the number of players have exceeded
          gameDocSnap.data().alivePlayers.length >=
          gameDocSnap.data().numberOfPlayers
        ) {
          console.error('errorNumPlayersExceeded');
          setError(t('errorNumPlayersExceeded'));
        } else {
          // Call the DB API and update the Alive Players
          await updateDocAlivePlayers(gameDocSnap, enteredPlayername, 'Role1');
          const updatedGameDocSnap = await getGameDocSnapshot(enteredGameId);
          setFetchedGameData(updatedGameDocSnap.data());
        }
      } else {
        console.error('The entered Game ID does not exist!');
        setError('The entered Game ID does not exist!');
        setFetchedGameData(null);
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
      {fetchedGameData && !error && (
        <>
          <Text style={styles.title}>
            {thisIsGod ? t('godTitle') : t('playerTitle')}
          </Text>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.tableRows}>{t('godName')}:</td>
                <td style={styles.tableRows}>{fetchedGameData.godName}</td>
              </tr>
              {!thisIsGod && (
                <tr>
                  <td style={styles.tableRows}>{t('gamePagePlayerName')}:</td>
                  <td style={styles.tableRows}>{playerName}</td>
                </tr>
              )}
              <tr>
                <td style={styles.tableRows}>{t('gamePageGameID')}:</td>
                <td style={styles.tableRows}>{gameID}</td>
              </tr>
              <tr>
                <td style={styles.tableRows}>{t('gameScenario')}:</td>
                <td style={styles.tableRows}>
                  {scenario.id.charAt(0).toUpperCase() + scenario.id.slice(1)}
                </td>
              </tr>
              {scenario.roles.map((role, index) => (
                <tr key={index}>
                  <td style={styles.tableRows}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </td>
                  <td style={styles.tableRows} />
                </tr>
              ))}
              <tr>
                <td style={styles.tableRows}>{t('gameNumAlivePlayers')}:</td>
                <td style={styles.tableRows}>
                  {fetchedGameData.alivePlayers.length} out of{' '}
                  {fetchedGameData.numberOfPlayers}
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GamePage;
