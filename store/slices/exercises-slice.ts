import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Exercise} from '../../types';

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
    addExercise(state, action: PayloadAction<Exercise>) {
      state.items.push(action.payload);
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
