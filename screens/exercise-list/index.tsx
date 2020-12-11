import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../App';
import {ExerciseListEntry} from './ExerciseListEntry';
import {v4 as uuid} from 'uuid';
import {Exercise} from '../../types';

// type NavigationProp = StackNavigationProp<RootStackParamList, 'Exercises'>;
type Props = {
  // navigation: NavigationProp;
  exercises: Array<Exercise>;
};

const exercises: Array<Exercise> = [
  new Exercise('Scales'),
  new Exercise('Have Fun'),
];

export const ExercisesListScreen = () => {
  return <FlatList<Exercise> data={exercises} renderItem={ExerciseListEntry} />;
};
