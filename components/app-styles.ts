import {StyleSheet} from 'react-native';

export const appStyles = StyleSheet.create({
  bodyText: {
    fontSize: 18,
  },
  screenFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 100,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  screenFooterButton: {
    color: '#3192ff',
    marginTop: 20,
    marginHorizontal: 30,
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
});
