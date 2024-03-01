export const createGame = (godName, numberOfPlayers) => {
  return {
    godName,
    numberOfPlayers,
    createdAtLocalTime: new Date(),
    gameFinished: false,
    alivePlayers: [],
    deadPlayers: [],
  };
};

export const setLocalStorageStartPage = (_gameID, _name) => {
  window.localStorage.setItem('godGeneratedGameID', _gameID);
  window.localStorage.setItem('godName', _name);
};

export const clearLocalStorageStartPage = () => {
  window.localStorage.removeItem('godGeneratedGameID');
  window.localStorage.removeItem('godName');
};
