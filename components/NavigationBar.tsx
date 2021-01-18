import {NavigationProp} from '@react-navigation/native';
import {StackHeaderProps} from '@react-navigation/stack';
import React from 'react';
import {Appbar} from 'react-native-paper';

export const NavigationBar = (props: StackHeaderProps) => (
  <Appbar.Header>
    {props.previous ? (
      <Appbar.BackAction onPress={props.navigation.goBack} />
    ) : null}
    <Appbar.Content title="Hello!" />
  </Appbar.Header>
);
