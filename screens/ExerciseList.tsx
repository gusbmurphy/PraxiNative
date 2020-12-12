import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {Exercise} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {Button, ListRenderItem, ListRenderItemInfo, Text} from 'react-native';
import {exerciseActions} from '../store/slices/exercises-slice';
import {v4 as uuid} from 'uuid';

// const exercises: Array<Exercise> = [
//   new Exercise('Scales'),
//   new Exercise('Have Fun'),
// ];

export const ExercisesListScreen = () => {
  const exercises = useSelector<RootState, Exercise[]>(
    (state) => state.exercises.items,
  );
  const dispatch = useDispatch();

  return (
    <>
      <FlatList<Exercise> data={exercises} renderItem={ExerciseListEntry} />
      <Button
        onPress={() =>
          dispatch(exerciseActions.addExercise({id: uuid(), title: "NewTime"}))
        }
        title="Hello!"
      />
    </>
  );
};

const ExerciseListEntry: ListRenderItem<Exercise> = (
  info: ListRenderItemInfo<Exercise>,
) => {
  return (
    <TouchableOpacity>
      <Text>{info.item.title}</Text>
    </TouchableOpacity>
  );
};
