import React, {useState} from 'react';
import {Switch, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {tagsActions} from '../../../store/slices/tags-slice';
import {Tag} from '../../../types';
import {appStyles} from '../../app-styles';
import {StyledModal, StyledTextInput} from '../../app-styled-components';
import {List, Button, Checkbox} from 'react-native-paper';

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

  /* TODO: This checkbox should really be used in place of the switch, but it
  isn't behaving correctly at the moment. */

  // const TagCheckbox = (props: {tag: Tag}) => {
  //   let {tag} = props;
  //   let [checked, setChecked] = useState(draftTagIds.includes(tag.id));

  //   return (
  //     <Checkbox
  //       status={checked ? 'checked' : 'unchecked'}
  //       onPress={() => {
  //         if (checked) {
  //           setDraftTagIds([...draftTagIds, tag.id]);
  //         } else {
  //           let i = draftTagIds.findIndex((tagId) => tagId === tag.id);
  //           const newDraftTagIds = [...draftTagIds];
  //           newDraftTagIds.splice(i, 1);
  //           setDraftTagIds(newDraftTagIds);
  //         }
  //         setChecked(!checked);
  //       }}
  //     />
  //   );
  // };

  return (
    <StyledModal visible={tagModalVisible} dismissable>
      {allTags.map((tag) => {
        let {title, id} = tag;
        return (
          <List.Item
            title={title}
            left={() => (
              // <TagCheckbox tag={tag} />
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
            )}
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
                  color: 'testColor',
                }),
              );
            }
            setDraftTagTitle('');
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
