// FILEPATH: /Users/hesam.ossanloo/Projects/FreeTimeProjects/MafiaGame/__tests__/firebaseConfig.test.js
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from '@env'
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
}

describe('Firebase configuration', () => {
  it('connects to Firebase', () => {
    firebase.initializeApp(firebaseConfig)
    const db = firebase.firestore()

    expect(db).toBeDefined()
  })
})
