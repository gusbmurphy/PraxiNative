import React from 'react';
import {Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Props = {
  navigation: NavigationProp;
};

export const HomeScreen = ({navigation}: Props) => {
  return (
    <Button
      title="Exercises"
      onPress={() => navigation.navigate('Exercises')}
    />
  );
};
