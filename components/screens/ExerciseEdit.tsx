import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import React, {useLayoutEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../App';
import {RootState} from '../../store';
import {exerciseActions} from '../../store/slices/exercises-slice';
import {appStyles} from '../app-styles';

export const ExerciseEditScreen = (
  props: StackScreenProps<RootStackParamList, 'ExerciseEdit'>,
) => {
  const [draftExercise, setDraftExercise] = useState(
    useSelector((state: RootState) =>
      state.exercises.items.find((e) => e.id === props.route.params.id),
    ),
  );

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() =>
            dispatch(
              exerciseActions.modifyExercise({
                withId: props.route.params.id,
                newExercise: draftExercise!,
              }),
            )
          }
          title={'Save'}
        />
      ),
    });
  });

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View style={[styles.editField, appStyles.listItem]}>
        <Text style={appStyles.bodyText}>Title: </Text>
        <TextInput
          value={draftExercise?.title}
          onChangeText={(text) =>
            setDraftExercise({
              ...draftExercise!,
              title: text,
            })
          }
          style={appStyles.bodyText}
        />
      </View>
      <View style={appStyles.screenFooter}>
        <Text>:)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editField: {
    flexDirection: 'row',
  },
});
