import React from 'react';
import {ListRenderItem, ListRenderItemInfo, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Exercise} from '../../types';

// type Props = {
//   exercise: Exercise;
//   onPress: (event: GestureResponderEvent) => void;
// };

export const ExerciseListEntry: ListRenderItem<Exercise> = (
  info: ListRenderItemInfo<Exercise>,
) => {
  return (
    <TouchableOpacity>
      <Text>{info.item.title}</Text>
    </TouchableOpacity>
  );
};
