import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {Button} from 'react-native';
import {View, Text, Modal} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {ExerciseParameter, CollectionExerciseParameter} from '../../../types';
import {CollectionValue} from '../../../types/exercise-parameter';
import {appStyles} from '../../app-styles';
import {InlineIcon} from '../../utility/Icons';
import {EditField} from './EditField';

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
  const [draftNewValue, setDraftNewValue] = useState('');
  const [shouldShowNewValueField, setShouldShowNewValueField] = useState(false);

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      transparent={true}
      style={appStyles.centeredView}>
      <View style={appStyles.modalView}>
        <EditField fieldName={'Title'}>
          <TextInput
            onChangeText={(text) => setDraftTitle(text)}
            value={draftTitle}
          />
        </EditField>
        <EditField fieldName={'Values'}>
          {draftValues.map((value) => {
            return <Text>{value}</Text>;
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
        </EditField>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Button onPress={() => setIsVisible(false)} title={'Cancel'} />
        <Button
          onPress={() => {
            setParameterFunction({
              title: draftTitle,
              id: parameter.id,
              values: draftValues,
            });
            setIsVisible(false);
          }}
          title={'Save'}
        />
      </View>
    </Modal>
  );
};

export default CollectionParameterEditModal;
