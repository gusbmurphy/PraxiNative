import {StyleSheet} from 'react-native';

export const appStyles = StyleSheet.create({
  bodyText: {
    fontSize: 18,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  listItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    paddingLeft: 20,
  },
  listSeperator: {
    backgroundColor: '#bfbfbf',
    height: 1,
    marginVertical: 10,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 28,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
});
