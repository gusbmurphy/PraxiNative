import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {ExerciseListEntry} from './ExerciseListEntry';
import {Exercise} from '../../types';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

// const exercises: Array<Exercise> = [
//   new Exercise('Scales'),
//   new Exercise('Have Fun'),
// ];

export const ExercisesListScreen = () => {
  const exercises = useSelector<RootState, Exercise[]>(
    (state) => state.exercises.items,
  );

  return <FlatList<Exercise> data={exercises} renderItem={ExerciseListEntry} />;
};
