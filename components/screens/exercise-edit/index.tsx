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
import {CollectionExerciseParameter, Tag} from '../../../types';
import {ExerciseParameter, CollectionValue} from '../../../types/exercise-parameter';
import {appStyles} from '../../app-styles';
import {InlineIcon} from '../../utility/Icons';
import {EditField} from './EditField';
import CollectionParameterEditModal from './CollectionParameterEditModal';
import {TagsModal} from './TagsModal';
import {v4 as uuid} from 'uuid';

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
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);

  const [
    isCollectionParameterEditModalVisible,
    setIsCollectionParameterEditModalVisible,
  ] = useState(false);

  /* Since we only have one parameter editing modal, we will need to also
  be able to pass it a different parameter to edit, and a different function
  to set that parameter, when we go to make it visible. */
  // Currently we are only working with 'set' type parameters, don't get confused with the word "set" being used so much!
  const [setTypeParameterToEdit, setSetTypeParameterToEdit] = useState<
    CollectionExerciseParameter<CollectionValue>
  >({
    title: 'New Set',
    id: uuid(),
    values: [],
  });
  // const [
  //   setTypeParameterToEditSetFunction,
  //   setSetTypeParameterToEditSetFunction,
  // ] = useState<(newParameter: CollectionExerciseParameter<CollectionValue>) => void>();

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
        tagModalVisible={isTagModalVisible}
        allTags={allTags}
        draftTagIds={draftTagIds}
        setDraftTagIds={setDraftTagIds}
        setTagModalVisible={setIsTagModalVisible}
      />
      <CollectionParameterEditModal
        isVisible={isCollectionParameterEditModalVisible}
        setIsVisible={setIsCollectionParameterEditModalVisible}
        parameter={setTypeParameterToEdit!}
        setParameterFunction={setSetTypeParameterToEdit}
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
          <TouchableOpacity onPress={() => setIsTagModalVisible(true)}>
            <InlineIcon icon={faPlusCircle} />
          </TouchableOpacity>
        </EditField>
        <EditField fieldName={'Parameters'}>
          {draftParameters.map((parameter) => {
            return (
              <TouchableOpacity
                key={parameter.id}
                onPress={() => {
                  console.log('Parameter: ', parameter);
                  // setSetTypeParameterToEdit(
                  //   parameter as SetExerciseParameter<SetValue>,
                  // );
                  // setSetTypeParameterToEditSetFunction(
                  //   (newParameter: ExerciseParameter) => {
                  //     const i = draftParameters.findIndex(
                  //       (e) => e.id === parameter.id,
                  //     );
                  //     let newDraftParameters = [...draftParameters];
                  //     newDraftParameters[i] = newParameter;
                  //     setDraftParameters(newDraftParameters);
                  //   },
                  // );
                  setIsCollectionParameterEditModalVisible(true);
                }}>
                <Text>{parameter.title}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            onPress={() => {
              const newParameter: CollectionExerciseParameter<string> = {
                title: 'New Set',
                id: uuid(),
                values: [],
              };
              setDraftParameters([...draftParameters, newParameter]);
            }}>
            <InlineIcon icon={faPlusCircle} />
          </TouchableOpacity>
        </EditField>
      </View>
    </View>
  );
};
