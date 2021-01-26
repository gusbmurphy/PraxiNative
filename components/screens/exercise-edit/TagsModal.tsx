import React, {useState} from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {tagsActions} from '../../../store/slices/tags-slice';
import {Tag} from '../../../types';
import {appStyles} from '../../app-styles';
import {StyledModal, StyledTextInput} from '../../app-styled-components';
import {Checkbox, List, Button} from 'react-native-paper';

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

  const TagCheckbox = (props: {tag: Tag}) => {
    let {tag} = props;
    return (
      <Checkbox
        status={draftTagIds.includes(tag.id) ? 'checked' : 'unchecked'}
        onPress={() => {
          if (draftTagIds.includes(tag.id)) {
            setDraftTagIds([...draftTagIds, tag.id]);
          } else {
            let i = draftTagIds.findIndex((tagId) => tagId === tag.id);
            const newDraftTagIds = [...draftTagIds];
            newDraftTagIds.splice(i, 1);
            setDraftTagIds(newDraftTagIds);
          }
        }}
      />
    );
  };

  return (
    <StyledModal visible={tagModalVisible} dismissable>
      {allTags.map((tag) => {
        let {title, id} = tag;
        return (
          <List.Item
            title={title}
            left={() => <TagCheckbox tag={tag} />}
            key={id}
          />
        );
      })}

      {showNewTagEdit ? (
        <StyledTextInput
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
      <View style={appStyles.row}>
        <Button onPress={() => setTagModalVisible(false)}>Cancel</Button>
        <Button onPress={() => setShowNewTagEdit(true)}>New Tag</Button>
        <Button onPress={() => setTagModalVisible(false)}>Save</Button>
      </View>
    </StyledModal>
  );
};
