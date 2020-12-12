import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {Exercise} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  Button,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
      <FlatList<Exercise>
        data={exercises}
        renderItem={ExerciseListItem}
        ItemSeparatorComponent={ExerciseListSeperator}
      />
      <Button
        onPress={() =>
          dispatch(exerciseActions.addExercise({id: uuid(), title: 'NewTime'}))
        }
        title="Hello!"
      />
    </>
  );
};

const ExerciseListItem: ListRenderItem<Exercise> = (
  info: ListRenderItemInfo<Exercise>,
) => {
  return (
    <TouchableOpacity>
      <Text style={styles.listItem}>{info.item.title}</Text>
    </TouchableOpacity>
  );
};

const ExerciseListSeperator = () => {
  return <View style={styles.listSeperator} />;
};

const styles = StyleSheet.create({
  listItem: {
    fontSize: 18,
    backgroundColor: '#f9f9f9',
    padding: 10,
    paddingLeft: 20,
  },
  listSeperator: {
    backgroundColor: '#bfbfbf',
    height: 1,
    marginVertical: 10,
  },
});
