import React from 'react';
import {Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

export const HomeScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}) => {
  return (
    <Button
      title="Exercises"
      onPress={() => navigation.navigate('Exercises')}
    />
  );
};
