// AppStyles.js
import { StyleSheet } from 'react-native'

const inputStyle = {
  height: 40,
  width: '100%',
  borderWidth: 1,
  padding: 10,
  color: 'white',
  borderColor: 'gray',
  borderRadius: 5,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
}

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Container padding
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
    textAlign: 'left',
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    width: '100%', // Take up 100% of the container's width
    alignItems: 'flex-start', // Align children to the start (left) of the container
    paddingHorizontal: '10%', // Add horizontal padding to align with the overall layout
  },
  input: {
    ...inputStyle,
  },
  buttonContainer: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    marginTop: 25,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
})
