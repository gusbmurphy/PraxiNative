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
import {RootStackParamList} from '../../App';
import {RootState} from '../../store';
import {exerciseActions} from '../../store/slices/exercises-slice';
import {tagsActions} from '../../store/slices/tags-slice';
import {Tag} from '../../types';
import {appStyles} from '../app-styles';
import {InlineIcon} from '../utility/Icons';

export const ExerciseEditScreen = (
  props: StackScreenProps<RootStackParamList, 'ExerciseEdit'>,
) => {
  const exerciseId = props.route.params.id;
  const originalExercise = useSelector((state: RootState) =>
    state.exercises.items.find((e) => e.id === exerciseId),
  );

  const [draftTitle, setDraftTitle] = useState(originalExercise!.title);
  const [draftTagIds, setDraftTagIds] = useState(originalExercise!.tagIds);

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
                },
              }),
            )
          }
          title={'Save'}
        />
      ),
    });
  });

  const TagsModal = () => {
    const [draftTagTitle, setDraftTagTitle] = useState('');
    const [showNewTagEdit, setShowNewTagEdit] = useState(false);

    return (
      <Modal
        animationType="slide"
        visible={tagModalVisible}
        transparent={true}
        style={appStyles.centeredView}>
        <View style={appStyles.modalView}>
          {allTags.map((tag) => {
            return (
              <View style={{flexDirection: 'row'}} key={tag.id}>
                <Switch
                  onValueChange={(isOn) => {
                    if (isOn) {
                      setDraftTagIds([...draftTagIds, tag.id]);
                    } else {
                      let i = draftTagIds.findIndex(
                        (tagId) => tagId === tag.id,
                      );
                      const newDraftTagIds = [...draftTagIds];
                      newDraftTagIds.splice(i, 1);
                      setDraftTagIds(newDraftTagIds);
                    }
                  }}
                  value={draftTagIds.includes(tag.id)}
                />
                <Text>{tag.title}</Text>
              </View>
            );
          })}
          {showNewTagEdit ? (
            <TextInput
              style={{
                height: 40,
                minWidth: 100,
                borderColor: 'gray',
                borderWidth: 1,
              }}
              onChangeText={(text) => setDraftTagTitle(text)}
              value={draftTagTitle}
              onSubmitEditing={() => {
                if (draftTagTitle.length > 0) {
                  dispatch(
                    tagsActions.addTag({
                      title: draftTagTitle,
                      color: 'oops',
                    }),
                  );
                }
                setShowNewTagEdit(false);
              }}
            />
          ) : null}
          <View style={{flexDirection: 'row'}}>
            <Button
              onPress={() => setTagModalVisible(false)}
              title={'Cancel'}
            />
            <Button onPress={() => setShowNewTagEdit(true)} title={'New Tag'} />
            <Button onPress={() => setTagModalVisible(false)} title={'Save'} />
          </View>
        </View>
      </Modal>
    );
  };

  const EditField: FunctionComponent<{fieldName: string}> = ({
    fieldName,
    children,
  }) => {
    return (
      <View style={[styles.editField, appStyles.listItem]}>
        <Text style={appStyles.bodyText}>{fieldName}: </Text>
        {children}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <TagsModal />
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

const styles = StyleSheet.create({
  editField: {
    flexDirection: 'row',
    marginBottom: 7,
  },
});
