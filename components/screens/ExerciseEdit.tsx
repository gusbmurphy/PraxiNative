import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useLayoutEffect, useState} from 'react';
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
  const [draftExercise, setDraftExercise] = useState(
    useSelector((state: RootState) =>
      state.exercises.items.find((e) => e.id === props.route.params.id),
    ),
  );
  const [tagModalVisible, setTagModalVisible] = useState(false);

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

  const TagsModal = () => {
    const allTags = useSelector<RootState, Tag[]>((state) => state.tags.items);
    const [draftTagTitle, setDraftTagTitle] = useState('');
    const [showNewTagEdit, setShowNewTagEdit] = useState(false);

    console.log(allTags);

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

  return (
    <>
      <View style={{flex: 1}}>
        <TagsModal />
        <View style={{flex: 1}}>
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
          <View style={[styles.editField, appStyles.listItem]}>
            <Text style={appStyles.bodyText}>Tags: </Text>
            {draftExercise?.tags.map((tag) => {
              <Text>{tag.title}</Text>;
            })}
            <TouchableOpacity onPress={() => setTagModalVisible(true)}>
              <InlineIcon icon={faPlusCircle} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  editField: {
    flexDirection: 'row',
    marginBottom: 7,
  },
});
