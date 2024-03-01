import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
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

export const docExists = async (gameID) => {
  const docRef = doc(db, 'games', gameID);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};
export const getGameInfo = async (gameID) => {
  const docRef = doc(db, 'games', gameID);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
