import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import db from './firebaseConfig'; // adjust the import path as needed
import { createGame } from './functions';

export const addNewGameToFirestore = async (godName, numberOfPlayers) => {
  const game = createGame(godName, numberOfPlayers);

  try {
    const docRef = await addDoc(collection(db, 'games'), {
      ...game,
      createdAtServerTime: serverTimestamp(), // Use server timestamp for consistency
    });

    return docRef.id; // Returns the newly created game ID
  } catch (error) {
    console.error('Error creating new game: ', error);
  }
};

export const getGameDocSnapshot = async (gameID) => {
  const docRef = doc(db, 'games', gameID);
  const docSnap = await getDoc(docRef);
  return docSnap;
};

export const getGameScenarios = async () => {
  const collectionRef = collection(db, 'scenarios');
  const querySnapshot = await getDocs(collectionRef);
  const scenarios = [];
  querySnapshot.forEach((docTmp) => {
    scenarios.push(docTmp);
  });
  return scenarios;
};

export const updateDocAlivePlayers = async (docSnap, playerName, role) => {
  let updateRes;

  try {
    updateRes = await updateDoc(docSnap.ref, {
      alivePlayers: arrayUnion(playerName),
      roles: {
        [playerName]: role,
      },
    });
  } catch (error) {
    console.error('Problem updating the Alive Players!', error);
  }
  return updateRes;
};
