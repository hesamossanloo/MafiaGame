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
  const [activeSession, setActiveSession] = useState(false);
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
  }, [fetchedGameData, showPopup, error, activeSession]);

  const fetchGameInfoForGod = async (enteredGameID) => {
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

  // Handle if it is God
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
      setActiveSession(true);
      // Because it is a promise, it is recommended to call it like this
      fetchGameInfoForGod(storedGodGeneratedGameId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGameIdSubmit = async (enteredGameId, enteredPlayername) => {
    setIsLoading(true);
    setError(null);
    setThisIsGod(false);
    let _localError = '';
    let _localSession = '';
    const storedPlayerNameGameID = window.localStorage.getItem(
      enteredPlayername + '_' + enteredGameId,
    );
    if (storedPlayerNameGameID) {
      _localSession = true;
      setActiveSession(true);
    } else {
      _localSession = false;
      setActiveSession(false);
    }
    try {
      // Fetch the Game Info from DB
      const gameDocSnap = await getGameDocSnapshot(enteredGameId);
      if (gameDocSnap.exists()) {
        // Update the states
        setGameID(enteredGameId);
        setIsLoading(false);
        setShowPopup(false);
        setFetchedGameData(gameDocSnap.data());
        setPlayerName(enteredPlayername);

        // Validate if already exists, unless add the player name to the list of active players
        // even though we have set the fetchedGameData, earlier, we have to use the
        // gameDocSnap.data(), because the useSatet will update the value first
        // after rerendering the component. So if we get the fetchedGameData.alivePlayers, it will show
        // the old value which is null or empty.
        if (
          !_localSession &&
          gameDocSnap.data().alivePlayers.includes(enteredPlayername)
        ) {
          _localError = t('errorPlayerExists');
          console.error(_localError);
          setError(_localError);
        }
        if (
          !_localSession &&
          // Check if the number of players have exceeded
          gameDocSnap.data().alivePlayers.length >=
            gameDocSnap.data().numberOfPlayers
        ) {
          _localError =
            t('errorNumPlayersExceeded') + gameDocSnap.data().numberOfPlayers;
          console.error(_localError);
          setError(_localError);
        }
        if (!_localSession && !_localError) {
          window.localStorage.setItem(
            enteredPlayername + '_' + enteredGameId,
            true,
          );
          setActiveSession(true);
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
      {fetchedGameData && !error && !showPopup && activeSession && (
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
                        if (Array.isArray(fetchedGameData.assignedRoles[key])) {
                          if (
                            fetchedGameData.assignedRoles[key][0] === playerName
                          ) {
                            return key;
                          }
                        } else {
                          return 'civilian-plain';
                        }
                      })}
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
                        (Array.isArray(fetchedGameData.assignedRoles[role])
                          ? fetchedGameData.assignedRoles[role].join(', ')
                          : fetchedGameData.assignedRoles[role])}
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
                    <td style={styles.tableRows}>{t('civilian-plain')}</td>
                    <td style={styles.tableRows}>
                      {fetchedGameData.assignedRoles &&
                        (Array.isArray(
                          fetchedGameData.assignedRoles['civilian-plain'],
                        )
                          ? fetchedGameData.assignedRoles['civilian-plain'][
                              index
                            ]
                          : fetchedGameData.assignedRoles['civilian-plain'])}
                    </td>
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
                await fetchGameInfoForGod(gameID);
              } catch (err) {
                console.error('Error fetching game info:', err);
                setError('Error fetching game info!');
                setIsLoading(false);
              }
            }}
          >
            <Text style={styles.buttonText}>{t('refresh')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              setIsLoading(true);
              setError(null);
              // window.localStorage.removeItem('playerNameGameID');
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>{t('joinANewGame')}</Text>
          </TouchableOpacity>
        </>
      )}
      {!thisIsGod && showPopup && !activeSession && (
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
