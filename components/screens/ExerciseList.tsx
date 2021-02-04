import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {Exercise} from '../../types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {ListRenderItem, ListRenderItemInfo, Text, View} from 'react-native';
import {exerciseActions} from '../../store/slices/exercises-slice';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {appStyles} from '../app-styles';
import {FAB, List, Divider} from 'react-native-paper';

export const ExerciseListScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, 'Exercises'>;
}) => {
  const exercises = useSelector<RootState, Exercise[]>(
    (state) => state.exercises.items,
  );

  const dispatch = useDispatch();
  const handleAddAction = () => {
    dispatch(
      exerciseActions.addExercise({
        title: 'New Exercise',
      }),
    );
  };

  const Item: ListRenderItem<Exercise> = (
    info: ListRenderItemInfo<Exercise>,
  ) => {
    const handlePress = () =>
      navigation.navigate('ExerciseEdit', {id: info.item.id});
    return (
      <List.Item title={info.item.title} onPress={handlePress} />
      // <TouchableOpacity
      //   onPress={() => navigation.navigate('ExerciseEdit', {id: info.item.id})}>
      //   <Text style={[appStyles.listItem, appStyles.bodyText]}>
      //     {info.item.title}
      //   </Text>
      // </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList<Exercise>
        data={exercises}
        renderItem={Item}
        ItemSeparatorComponent={Divider}
        accessibilityLabel="list of exercises"
      />
      <FAB
        icon="plus"
        onPress={handleAddAction}
        style={appStyles.fab}
        accessibilityLabel="add new exercise"
      />
    </>
  );
};
