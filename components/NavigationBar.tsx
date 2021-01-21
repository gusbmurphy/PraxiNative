import {StackHeaderProps} from '@react-navigation/stack';
import React from 'react';
import {Appbar} from 'react-native-paper';

export const NavigationBar = (props: StackHeaderProps) => {
  let rightComponent = props.scene.descriptor.options.headerRight
    ? props.scene.descriptor.options.headerRight({tintColor: undefined})
    : null;

  return (
    <Appbar.Header>
      {props.previous ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : null}
      <Appbar.Content
        title={
          props.scene.descriptor.options.title
            ? props.scene.descriptor.options.title
            : props.scene.route.name
        }
      />
      {rightComponent}
    </Appbar.Header>
  );
};
