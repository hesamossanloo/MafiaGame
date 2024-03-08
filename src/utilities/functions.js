export const createGame = (godName, numberOfPlayers, scenario) => {
  return {
    godName,
    numberOfPlayers,
    createdAtLocalTime: new Date(),
    gameFinished: false,
    alivePlayers: [],
    deadPlayers: [],
    assignedRoles: [],
    scenario: scenario.id,
    allRoles: scenario.data().roles,
  };
};

export const setLocalStorageStartPage = (_gameID, _name, _scenario) => {
  window.localStorage.setItem('godGeneratedGameID', _gameID);
  window.localStorage.setItem('godName', _name);
  window.localStorage.setItem(
    'scenario',
    JSON.stringify({ id: _scenario.id, roles: _scenario.data().roles }),
  );
};

export const clearLocalStorageStartPage = () => {
  window.localStorage.removeItem('godGeneratedGameID');
  window.localStorage.removeItem('godName');
};
