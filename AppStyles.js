// AppStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageSwitch: {
    position: 'absolute',
    top: 40, // Adjust based on your status bar height or notch
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  flag: {
    fontSize: 32, // Adjust based on your preference
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});