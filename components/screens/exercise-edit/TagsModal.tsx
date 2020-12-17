import React, {useState} from 'react';
import {Modal, View, Text, Button} from 'react-native';
import {Switch, TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {tagsActions} from '../../../store/slices/tags-slice';
import {Tag} from '../../../types';
import {appStyles} from '../../app-styles';

export const TagsModal = ({
  tagModalVisible,
  allTags,
  draftTagIds,
  setDraftTagIds,
  setTagModalVisible,
}: {
  tagModalVisible: boolean;
  allTags: Tag[];
  draftTagIds: string[];
  setDraftTagIds: (tagIds: string[]) => void;
  setTagModalVisible: (isVisible: boolean) => void;
}) => {
  const [draftTagTitle, setDraftTagTitle] = useState('');
  const [showNewTagEdit, setShowNewTagEdit] = useState(false);

  const dispatch = useDispatch();

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
                    let i = draftTagIds.findIndex((tagId) => tagId === tag.id);
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
          <Button onPress={() => setTagModalVisible(false)} title={'Cancel'} />
          <Button onPress={() => setShowNewTagEdit(true)} title={'New Tag'} />
          <Button onPress={() => setTagModalVisible(false)} title={'Save'} />
        </View>
      </View>
    </Modal>
  );
};
