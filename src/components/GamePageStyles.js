import { StyleSheet } from 'react-native';

const container = {
  flex: 1,
  backgroundColor: '#000',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10, // Container padding
};
const gamePageContainer = {
  color: 'white',
};
const button = {
  backgroundColor: 'red',
  padding: 10,
  borderRadius: 5,
  marginTop: 10,
  minWidth: '50%',
};
export default StyleSheet.create({
  gamePageContainer: {
    ...container,
    ...gamePageContainer,
  },
  title: {
    fontWeight: '700',
    fontSize: '24px',
    color: 'white',
    marginBottom: 10,
  },
  table: { border: '0.1px solid white', padding: '2px', minWidth: '50%' },
  tableRows: { border: '0.1px solid white', padding: '2px' },
  button: {
    ...button,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
