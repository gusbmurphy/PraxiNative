import {HeaderTitle} from '@react-navigation/stack';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Exercise} from '../../types';
import {v4 as uuid} from 'uuid';

type ExercisesSliceState = {
  items: Exercise[];
};

const initialState: ExercisesSliceState = {
  items: [],
};

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    addExercise(state, action: PayloadAction<{title: string}>) {
      state.items.push({
        title: action.payload.title,
        id: uuid(),
        tagIds: [],
        parameters: [],
      });
    },
    modifyExercise(
      state,
      action: PayloadAction<{
        withId: string;
        newExercise: Exercise;
      }>,
    ) {
      let i = state.items.findIndex((e) => e.id === action.payload.withId);
      state.items[i] = action.payload.newExercise;
    },
  },
});

export const exerciseActions = exercisesSlice.actions;
export default exercisesSlice.reducer;
