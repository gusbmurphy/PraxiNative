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
  },
});

export const exerciseActions = exercisesSlice.actions;
export default exercisesSlice.reducer;
