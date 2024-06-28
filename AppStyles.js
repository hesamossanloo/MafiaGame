// AppStyles.js
import { StyleSheet } from 'react-native';

const copyButton = {
  // backgroundColor: 'rgba(128, 128, 128, 0.5)',
  borderRadius: 5,
  marginLeft: 10, // Add some space between the input and the button
  justifyContent: 'center',
  alignItems: 'center',
  width: 40, // Adjust based on your preference
  height: 40, // Adjust based on your preference
  borderColor: 'black', // Add a black border
  borderWidth: 2,
};
const inputStyle = {
  height: 40,
  width: '100%',
  borderWidth: 1,
  padding: 10,
  color: 'white',
  borderColor: 'gray',
  borderRadius: 5,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
};
const button = {
  backgroundColor: 'red',
  padding: 10,
  borderRadius: 5,
};
const container = {
  flex: 1,
  backgroundColor: '#000',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20, // Container padding
};
const modalContainer = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
};
const modalContent = {
  backgroundColor: 'red',
  padding: 20,
  borderRadius: 5,
  width: '80%', // Take up 80% of the screen width
  alignItems: 'stretch',
};

export default StyleSheet.create({
  container: {
    ...container,
  },
  modalContainer: {
    ...modalContainer,
  },
  modalContent: {
    ...modalContent,
  },
  languageSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'red',
  },
  flag: {
    fontSize: 29, // Adjust based on your preference
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
    ...button,
  },
  modalButton: { ...button, backgroundColor: 'black' },
  modalInputCopyContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 10,
  },
  copyButton: {
    ...copyButton,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  addRoleButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    // padding: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  removeButton: {
    marginLeft: 10,
  },
});
