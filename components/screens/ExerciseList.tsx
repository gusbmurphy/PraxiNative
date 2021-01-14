import React, {useState} from 'react';
import {FlatList, State, TouchableOpacity} from 'react-native-gesture-handler';
import {Exercise} from '../../types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {ListRenderItem, ListRenderItemInfo, Text, View} from 'react-native';
import {exerciseActions} from '../../store/slices/exercises-slice';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {appStyles} from '../app-styles';
import {FooterIcon} from '../utility/Icons';

export const ExercisesListScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, 'Exercises'>;
}) => {
  const exercises = useSelector<RootState, Exercise[]>(
    (state) => state.exercises.items,
  );
  const newestExerciseId = useNewestExerciseId();

  const ExerciseListEntry: ListRenderItem<Exercise> = (
    info: ListRenderItemInfo<Exercise>,
  ) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ExerciseEdit', {id: info.item.id})}>
        <Text style={[appStyles.listItem, appStyles.bodyText]}>
          {info.item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const Seperator = () => {
    return <View style={appStyles.listSeperator} />;
  };

  const ScreenFooter = () => {
    const dispatch = useDispatch();

    return (
      <View style={appStyles.screenFooter}>
        <TouchableOpacity
          onPress={() => {
            dispatch(
              exerciseActions.addExercise({
                title: 'New Exercise',
              }),
            );
            navigation.navigate('ExerciseEdit', {id: newestExerciseId});
          }}>
          <FooterIcon icon={faPlusCircle} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <FlatList<Exercise>
        data={exercises}
        renderItem={ExerciseListEntry}
        ItemSeparatorComponent={Seperator}
      />
      <ScreenFooter />
    </>
  );
};

function useNewestExerciseId(): string {
  return useSelector<RootState, string>(
    (state) => state.exercises.items[state.exercises.items.length - 1].id,
  );
}
