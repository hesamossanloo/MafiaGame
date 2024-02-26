import { StyleSheet } from 'react-native';

const container = {
  flex: 1,
  backgroundColor: '#000',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20, // Container padding
};
const gamePageContainer = {
  color: 'white',
};
export default StyleSheet.create({
  gamePageContainer: {
    ...container,
    ...gamePageContainer,
  },
  text: {
    color: 'white',
  },
  table: { border: '1px solid white', padding: '5px', minWidth: '50%' },
  tableRows: { border: '1px solid white', padding: '5px' },
});
