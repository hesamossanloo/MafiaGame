import React, { useEffect, useState } from 'react'
import {
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import styles from './AppStyles' // Adjust the path as needed
import { addNewGameToFirestore } from './src/utilities/firestoreService'
import i18n from './src/utilities/i18n' // Updated path

const App = () => {
  const [isEnabled, setIsEnabled] = useState(i18n.language === 'fa')
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    const newLang = isEnabled ? 'en' : 'fa'
    i18n.changeLanguage(newLang)
  }

  useEffect(() => {
    const handleLangChange = () => {
      setIsEnabled(i18n.language === 'fa')
    }

    i18n.on('languageChanged', handleLangChange)
    return () => {
      i18n.off('languageChanged', handleLangChange)
    }
  }, [])

  const Form = () => {
    const [godName, setGodName] = useState('')
    const [numberOfPlayers, setNumberOfPlayers] = useState('')

    const handleSubmit = () => {
      // Call the Firestore function to create a new game document
      addNewGameToFirestore(godName, numberOfPlayers)
        .then(gameID => {
          console.log(`Game ID: ${gameID} created successfully`)
        })
        .catch(error => {
          console.error('Error creating game:', error)
        })
    }

    return (
      <>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{i18n.t('nameOfGodLabel')}</Text>
          <TextInput
            style={styles.input}
            placeholder={i18n.t('nameOfGodLabel')}
            placeholderTextColor="white"
            value={godName}
            onChangeText={text => setGodName(text)}
          />
          <Text style={styles.label}>{i18n.t('numberOfPlayers')}</Text>
          <TextInput
            style={styles.input}
            placeholder={i18n.t('numberOfPlayers')}
            placeholderTextColor="white"
            keyboardType="numeric"
            value={numberOfPlayers}
            onChangeText={text => setNumberOfPlayers(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{i18n.t('createNewGame')}</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.languageSwitch}>
        <Text style={styles.flag}>🇬🇧</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={styles.flag}>🇮🇷</Text>
      </View>

      <Image
        source={require('./assets/mafia-silhouette.jpeg')}
        style={styles.logo}
      />
      <Form />
    </View>
  )
}

export default App
