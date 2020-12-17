import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FunctionComponent, useLayoutEffect, useState} from 'react';
import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import {
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../../App';
import {RootState} from '../../../store';
import {exerciseActions} from '../../../store/slices/exercises-slice';
import {tagsActions} from '../../../store/slices/tags-slice';
import {Tag} from '../../../types';
import {appStyles} from '../../app-styles';
import {InlineIcon} from '../../utility/Icons';
import { EditField } from './EditField';
import {TagsModal} from './TagsModal';

export const ExerciseEditScreen = (
  props: StackScreenProps<RootStackParamList, 'ExerciseEdit'>,
) => {
  const exerciseId = props.route.params.id;
  const originalExercise = useSelector((state: RootState) =>
    state.exercises.items.find((e) => e.id === exerciseId),
  );

  const [draftTitle, setDraftTitle] = useState(originalExercise!.title);
  const [draftTagIds, setDraftTagIds] = useState(originalExercise!.tagIds);
  const [draftParameters, setDraftParameters] = useState(
    originalExercise!.parameters,
  );

  const allTags = useSelector<RootState, Tag[]>((state) => state.tags.items);
  const [tagModalVisible, setTagModalVisible] = useState(false);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() =>
            dispatch(
              exerciseActions.modifyExercise({
                withId: exerciseId,
                newExercise: {
                  id: originalExercise!.id,
                  title: draftTitle,
                  tagIds: draftTagIds,
                  parameters: draftParameters,
                },
              }),
            )
          }
          title={'Save'}
        />
      ),
    });
  });

  return (
    <View style={{flex: 1}}>
      <TagsModal
        tagModalVisible={tagModalVisible}
        allTags={allTags}
        draftTagIds={draftTagIds}
        setDraftTagIds={setDraftTagIds}
        setTagModalVisible={setTagModalVisible}
      />
      <View style={{flex: 1}}>
        <EditField fieldName={'Title'}>
          <TextInput
            value={draftTitle}
            onChangeText={(text) => setDraftTitle(text)}
            style={appStyles.bodyText}
          />
        </EditField>
        <EditField fieldName={'Tags'}>
          {draftTagIds.map((tagId) => {
            return (
              <Text style={appStyles.bodyText} key={tagId}>
                {allTags.find((tag) => tag.id === tagId)?.title}
              </Text>
            );
          })}
          <TouchableOpacity onPress={() => setTagModalVisible(true)}>
            <InlineIcon icon={faPlusCircle} />
          </TouchableOpacity>
        </EditField>
      </View>
    </View>
  );
};
