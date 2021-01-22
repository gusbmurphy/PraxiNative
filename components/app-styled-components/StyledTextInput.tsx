import React, {ComponentProps} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {appStyles} from '../app-styles';

const styles = StyleSheet.create({
  textInput: {
    margin: 8,
  },
});

export const StyledTextInput = (props: ComponentProps<typeof TextInput>) => (
  <TextInput style={styles.textInput} {...props} />
);
