import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Exercise} from '../../types';
import {v4 as uuid} from 'uuid';

type ExercisesSliceState = {
  items: Exercise[];
};

export const initialState: ExercisesSliceState = {
  items: [],
};

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    addExercise(state, action: PayloadAction<{title: string}>) {
      let {title} = action.payload;

      // Trim any excess whitespaces at end of title...
      title = title.replace(/\s+$/g, '');

      /* Check to see if there's another exercise with this name, if so, add a number to the end.
      We'll use a regular expression to ensure that we are finding an item with just the name (as
      opposed to simply including it in a larger string), and possibly a number that we've appended
      to it. */
      let titleRegExp = createTitleRegExp(title);
      let indexOfExistingTitle = state.items.findIndex((item) =>
        titleRegExp.test(item.title),
      );

      if (indexOfExistingTitle !== -1) {
        let appendedNum = 1;
        let numRegExp = createNumberedTitleRegExp(title, appendedNum);

        while (
          state.items.findIndex((item) => numRegExp.test(item.title)) !== -1
        ) {
          appendedNum++;
          numRegExp = createNumberedTitleRegExp(title, appendedNum);
        }

        title += ' ' + appendedNum;
      }

      state.items.push({
        title: title,
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

function createTitleRegExp(title: string) {
  return new RegExp(String.raw`^${title}(?:\s\d+)?$`, 'gi');
}

function createNumberedTitleRegExp(title: string, num: number) {
  return new RegExp(String.raw`^${title}\s${num}$`);
}

export const exerciseActions = exercisesSlice.actions;
export default exercisesSlice.reducer;
