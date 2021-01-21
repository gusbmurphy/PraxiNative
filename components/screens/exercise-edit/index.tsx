import {StackScreenProps} from '@react-navigation/stack';
import React, {useLayoutEffect, useState} from 'react';
import {Button, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../../App';
import {RootState} from '../../../store';
import {exerciseActions} from '../../../store/slices/exercises-slice';
import {CollectionExerciseParameter, Tag} from '../../../types';
import {CollectionValue} from '../../../types/exercise-parameter';
import {appStyles} from '../../app-styles';
import CollectionParameterEditModal from './CollectionParameterEditModal';
import {TagsModal} from './TagsModal';
import {v4 as uuid} from 'uuid';
import {List, useTheme, Divider, Appbar} from 'react-native-paper';
import {StyledChip, StyledTextInput} from '../../app-styled-components';

export const ExerciseEditScreen = (
  props: StackScreenProps<RootStackParamList, 'ExerciseEdit'>,
) => {
  const exerciseId = props.route.params.id;
  const originalExercise = useSelector((state: RootState) =>
    state.exercises.items.find((e) => e.id === exerciseId),
  );

  const [draftTitle, setDraftTitle] = useState(originalExercise!.title);
  const [draftTagIds, setDraftTagIds] = useState(originalExercise!.tagIds);
  const [draftParameters] = useState(originalExercise!.parameters);

  const allTags = useSelector<RootState, Tag[]>((state) => state.tags.items);
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);

  const [
    isCollectionParameterEditModalVisible,
    setIsCollectionParameterEditModalVisible,
  ] = useState(false);

  /* Since we only have one parameter editing modal, we will need to also
  be able to pass it a different parameter to edit, and a different function
  to set that parameter, when we go to make it visible. */
  const [collectionParameterToEdit] = useState<
    CollectionExerciseParameter<CollectionValue>
  >({
    title: 'New Set',
    id: uuid(),
    values: [],
  });
  const [collectionParameterToEditSetFunction] = useState<
    (newParameter: CollectionExerciseParameter<CollectionValue>) => void
  >();

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Appbar.Action
          icon="content-save"
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
        />
        // <Button
        //   onPress={() =>
        //     dispatch(
        //       exerciseActions.modifyExercise({
        //         withId: exerciseId,
        //         newExercise: {
        //           id: originalExercise!.id,
        //           title: draftTitle,
        //           tagIds: draftTagIds,
        //           parameters: draftParameters,
        //         },
        //       }),
        //     )
        //   }
        //   title={'Save'}
        // />
      ),
    });
  });

  const {colors} = useTheme();

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
        parameter={collectionParameterToEdit!}
        setParameterFunction={collectionParameterToEditSetFunction!}
      />

      <View style={{flex: 1}}>
        <StyledTextInput
          mode="outlined"
          label="Title"
          value={draftTitle}
          onChangeText={(text) => setDraftTitle(text)}
        />
        <Divider />

        {/* <EditField fieldName={'Tags'}>
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
        </EditField> */}
        <List.Section title="Tags">
          <View style={appStyles.row}>
            {draftTagIds.map((tagId) => (
              <StyledChip>
                {allTags.find((tag) => tag.id === tagId)?.title}
              </StyledChip>
            ))}
            <StyledChip
              mode="outlined"
              color={colors.primary}
              icon="plus"
              onPress={() => setIsTagModalVisible(true)}>
              Add Tag
            </StyledChip>
          </View>
        </List.Section>
        <Divider />

        {/* <EditField fieldName={'Parameters'}>
          {draftParameters.map((parameter) => {
            return (
              <TouchableOpacity
                key={parameter.id}
                onPress={() => {
                  console.log('Parameter: ', parameter);
                  setCollectionParameterToEdit(
                    parameter as CollectionExerciseParameter<CollectionValue>,
                  );
                  // Thank you to Hannes Petri for this Medium article:
                  // https://medium.com/swlh/how-to-store-a-function-with-the-usestate-hook-in-react-8a88dd4eede1
                  setCollectionParameterToEditSetFunction(() =>
                    createSetParameterFunction(parameter.id),
                  );
                  setIsCollectionParameterEditModalVisible(true);
                }}>
                <Text>{parameter.title}</Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            onPress={() => {
              const newParameter: CollectionExerciseParameter<string> = {
                title: 'New Collection',
                id: uuid(),
                values: [],
              };
              setDraftParameters([...draftParameters, newParameter]);
            }}>
            <InlineIcon icon={faPlusCircle} />
          </TouchableOpacity>
        </EditField> */}
        <List.Section title="Parameters">
          <View style={appStyles.row}>
            {/* {draftParameters.map((parameter) => {
            if (isCollectionParameter(parameter)) {
              return (
                <List.Accordion title={parameter.title} key={parameter.id}>
                  {parameter.values.map((value) => (
                    <List.Item title={value} key={value + parameter.id} />
                  ))}
                </List.Accordion>
              );
            } else {
              console.error('Encountered unknown parameter type.');
              return null;
            }
          })} */}
            <StyledChip
              mode="outlined"
              color={colors.primary}
              icon="plus"
              onPress={() => {}}>
              Add Parameter
            </StyledChip>
          </View>
        </List.Section>
      </View>
    </View>
  );
};
