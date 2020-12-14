import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Tag} from '../../types';
import {v4 as uuid} from 'uuid';

type TagsSliceState = {
  items: Tag[];
};

const initialState: TagsSliceState = {
  items: [],
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag(state, action: PayloadAction<{title: string; color: string}>) {
      state.items.push({
        title: action.payload.title,
        color: action.payload.color,
        id: uuid(),
      });
    },
    modifyTag(
      state,
      action: PayloadAction<{
        withId: string;
        newTag: Tag;
      }>,
    ) {
      let i = state.items.findIndex((e) => e.id === action.payload.withId);
      state.items[i] = action.payload.newTag;
    },
  },
});

export const tagsActions = tagsSlice.actions;
export default tagsSlice.reducer;
