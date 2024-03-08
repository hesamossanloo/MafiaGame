import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  getGameDocSnapshot,
  updateDocAlivePlayers,
} from '../utilities/firestoreService';
import styles from './GamePageStyles';
import GamePopup from './GamePopup';

const GamePage = ({ navigation }) => {
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
    } else {
      setShowPopup(true);
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

      const storedScenarioJSON = JSON.parse(
        window.localStorage.getItem('scenario'),
      );
      if (storedScenarioJSON) {
        setScenario(storedScenarioJSON);
      } else {
        setError(t('errorScenarioMissing'));
      }
      setPlayerName(storedGodName);
      setGameID(storedGodGeneratedGameId);
      setThisIsGod(true);
      setShowPopup(false);

      // Because it is a promise, it is recommended to call it like this
      fetchGameInfo(storedGodGeneratedGameId);
    }
    const storedPlayerNameGameID =
      window.localStorage.getItem('playerNameGameID');
    if (storedPlayerNameGameID) {
      setShowPopup(false);
      const storedPlayerNameGameIDTMP = storedPlayerNameGameID.split('_');
      const storedGameIDTMP = storedPlayerNameGameIDTMP[1];
      const storedPlayerNameTMP = storedPlayerNameGameIDTMP[0];
      handleGameIdSubmit(storedGameIDTMP, storedPlayerNameTMP);
    } else {
      setShowPopup(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGameIdSubmit = async (enteredGameId, enteredPlayername) => {
    setIsLoading(true);
    setError(null);
    setThisIsGod(false);
    let activeSession = false;
    const storedPlayerNameGameID =
      window.localStorage.getItem('playerNameGameID');
    if (
      storedPlayerNameGameID &&
      storedPlayerNameGameID === enteredPlayername + '_' + enteredGameId
    ) {
      activeSession = true;
    }
    try {
      // Fetch the Game Info from DB
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
        if (activeSession) {
          return;
        }
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
          setError(
            t('errorNumPlayersExceeded') + gameDocSnap.data().numberOfPlayers,
          );
        } else {
          !storedPlayerNameGameID &&
            window.localStorage.setItem(
              'playerNameGameID',
              enteredPlayername + '_' + enteredGameId,
            );
          // Call the DB API and update the Alive Players
          await updateDocAlivePlayers(gameDocSnap, enteredPlayername);
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
      {fetchedGameData && !error && !showPopup && (
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
                <td style={styles.tableRows}>{t('role')}:</td>
                <td style={styles.tableRows}>
                  {thisIsGod
                    ? t('god')
                    : Object.keys(fetchedGameData.assignedRoles).map((key) => {
                        if (fetchedGameData.assignedRoles[key] === playerName) {
                          return key;
                        }
                      })}
                </td>
              </tr>
              <tr>
                <td style={styles.tableRows}>{t('gameScenario')}:</td>
                <td style={styles.tableRows}>
                  {fetchedGameData.scenario.charAt(0).toUpperCase() +
                    fetchedGameData.scenario.slice(1)}
                </td>
              </tr>
              {/* Show all the roles */}
              {thisIsGod &&
                scenario.roles &&
                scenario.roles.map((role, index) => (
                  <tr key={index}>
                    <td style={styles.tableRows}>{t(role)}</td>
                    <td style={styles.tableRows}>
                      {fetchedGameData.assignedRoles &&
                        fetchedGameData.assignedRoles[role]}
                    </td>
                  </tr>
                ))}
              {thisIsGod &&
                scenario.roles.length < fetchedGameData.numberOfPlayers &&
                scenario.roles &&
                fetchedGameData.numberOfPlayers &&
                [
                  ...Array(
                    fetchedGameData.numberOfPlayers - scenario.roles.length,
                  ),
                ].map((_, index) => (
                  <tr key={scenario.roles.length + index}>
                    <td style={styles.tableRows}>Civilian-plain</td>
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
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              setIsLoading(true);
              setError(null);
              try {
                await fetchGameInfo(gameID);
              } catch (err) {
                console.error('Error fetching game info:', err);
                setError('Error fetching game info!');
                setIsLoading(false);
              }
            }}
          >
            <Text style={styles.buttonText}>{t('refresh')}</Text>
          </TouchableOpacity>
        </>
      )}
      {!thisIsGod && showPopup && (
        <GamePopup
          visible={showPopup}
          isLoading={isLoading}
          error={error}
          onRequestClose={() => {
            setShowPopup(false); // Close the popup when the user manually closes it
            setError(null); // Reset the error state
          }}
          onSubmit={handleGameIdSubmit}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default GamePage;
