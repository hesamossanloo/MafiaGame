export const createGame = (gameName, numberOfPlayers) => {
  return {
    gameName,
    numberOfPlayers,
    createdAtLocalTime: new Date(),
    gameFinished: false,
    alivePlayers: [],
    deadPlayers: [],
  }
}
