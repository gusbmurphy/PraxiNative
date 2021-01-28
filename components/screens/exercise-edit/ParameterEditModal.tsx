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
  const [] = useState('');
  const [] = useState(false);

  function removeValue(targetId: string) {
    let i = draftValues.findIndex((value) => value.id === targetId);
    let newDraftValues = [...draftValues];
    newDraftValues.splice(i, 1);
    setDraftValues(newDraftValues);
  }

  return (
    // <Modal
    //   animationType="slide"
    //   visible={isVisible}
    //   transparent={true}
    //   style={appStyles.centeredView}>
    <StyledModal visible={isVisible}>
      {/* <EditField fieldName={'Title'}>
          <TextInput
            onChangeText={(text) => setDraftTitle(text)}
            value={draftTitle}
          />
        </EditField> */}
      <StyledTextInput
        onChangeText={(text) => setDraftTitle(text)}
        value={draftTitle}
        mode="outlined"
        label="Title"
      />
      {/* <EditField fieldName={'Values'}>
          {draftValues.map((value, i) => {
            return <Text key={value + i}>{value}</Text>;
          })}
          {shouldShowNewValueField ? (
            <TextInput
              value={draftNewValue}
              onChangeText={(text) => setDraftNewValue(text)}
              onSubmitEditing={() => {
                if (draftNewValue !== '') {
                  setDraftValues([...draftValues, draftNewValue]);
                  setDraftNewValue('');
                }
                setShouldShowNewValueField(false);
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => setShouldShowNewValueField(true)}>
              <InlineIcon icon={faPlusCircle} />
            </TouchableOpacity>
          )}
        </EditField> */}
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
    // </Modal>
  );
};

export default CollectionParameterEditModal;
