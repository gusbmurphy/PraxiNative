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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
  },
});
