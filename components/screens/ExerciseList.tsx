import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {Exercise} from '../../types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {exerciseActions} from '../../store/slices/exercises-slice';
import {v4 as uuid} from 'uuid';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {appStyles} from '../app-styles';
import {FooterIcon} from '../utility/FooterIcon';

export const ExercisesListScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, 'Exercises'>;
}) => {
  const exercises = useSelector<RootState, Exercise[]>(
    (state) => state.exercises.items,
  );

  const Item: ListRenderItem<Exercise> = (
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
              exerciseActions.addExercise({id: uuid(), title: 'NewTime'}),
            );
            navigation.navigate('Exercises');
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
        renderItem={Item}
        ItemSeparatorComponent={Seperator}
      />
      <ScreenFooter />
    </>
  );
};
