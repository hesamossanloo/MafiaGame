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

export const addNewGameToFirestore = async (
  _godName,
  _numberOfPlayers,
  _scenario,
  _additionalRoles,
) => {
  const game = createGame(
    _godName,
    _numberOfPlayers,
    _scenario,
    _additionalRoles,
  );
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

export const updateDocAlivePlayers = async (docSnap, playerName) => {
  let updateRes;

  try {
    const docData = docSnap.data();
    let randomRole;

    // Only choose a random role if allRoles is not empty
    if (docData.allRolesTMP.length > 0) {
      // Randomly choose a Role
      const randomIndex = Math.floor(
        Math.random() * docData.allRolesTMP.length,
      );
      randomRole = docData.allRolesTMP[randomIndex];

      // Remove the randomly chosen role from allRoles
      docData.allRolesTMP.splice(randomIndex, 1);
    }

    const updatedAssignedRoles = {
      ...docData.assignedRoles,
      [randomRole]: docData.assignedRoles[randomRole]
        ? [...docData.assignedRoles[randomRole], playerName]
        : [playerName],
    };

    updateRes = await updateDoc(docSnap.ref, {
      alivePlayers: arrayUnion(playerName),
      assignedRoles: updatedAssignedRoles,
      allRolesTMP: docData.allRolesTMP, // Update allRoles in the document
    });
  } catch (error) {
    console.error('Problem updating the Alive Players!', error);
  }
  return updateRes;
};
