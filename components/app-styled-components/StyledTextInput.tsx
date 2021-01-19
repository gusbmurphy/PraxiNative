import React, {ComponentProps} from 'react';
import {TextInput} from 'react-native-paper';
import {appStyles} from '../app-styles';

export const StyledTextInput = (props: ComponentProps<typeof TextInput>) => (
  <TextInput style={appStyles.textInput} {...props} />
);
