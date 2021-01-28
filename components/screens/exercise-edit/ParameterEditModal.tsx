import React, {useState} from 'react';
import {View} from 'react-native';
import {Caption, Divider, List, Button} from 'react-native-paper';
import {CollectionExerciseParameter} from '../../../types';
import {CollectionValue} from '../../../types/exercise-parameter';
import {
  StyledChip,
  StyledModal,
  StyledTextInput,
} from '../../app-styled-components';
import {appStyles} from '../../app-styles';

type CollectionParameterEditModalProps<T extends CollectionValue> = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  parameter: CollectionExerciseParameter<T>;
  setParameterFunction: (newParameter: CollectionExerciseParameter<T>) => void;
};

const CollectionParameterEditModal = ({
  isVisible,
  setIsVisible,
  parameter,
  setParameterFunction,
}: CollectionParameterEditModalProps<any>) => {
  const [draftTitle, setDraftTitle] = useState(parameter.title);
  const [draftValues, setDraftValues] = useState(parameter.values);

  function removeValue(targetId: string) {
    let i = draftValues.findIndex((value) => value.id === targetId);
    let newDraftValues = [...draftValues];
    newDraftValues.splice(i, 1);
    setDraftValues(newDraftValues);
  }

  return (
    <StyledModal visible={isVisible}>
      <StyledTextInput
        onChangeText={(text) => setDraftTitle(text)}
        value={draftTitle}
        mode="outlined"
        label="Title"
      />
      <Divider />
      <List.Section title="Values">
        {draftValues.length > 1 ? (
          draftValues.map((value) => {
            return (
              <StyledChip
                icon="close-circle"
                key={value.id}
                onPress={() => removeValue(value.id)}>
                {value.content}
              </StyledChip>
            );
          })
        ) : (
          <Caption>(None)</Caption>
        )}
      </List.Section>
      <View style={appStyles.row}>
        <Button onPress={() => setIsVisible(false)}>Cancel</Button>
        <Button
          onPress={() => {
            setParameterFunction({
              title: draftTitle,
              id: parameter.id,
              values: draftValues,
            });
            setIsVisible(false);
          }}>
          Save
        </Button>
      </View>
    </StyledModal>
  );
};

export default CollectionParameterEditModal;
