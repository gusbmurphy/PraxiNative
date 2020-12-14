import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import exercisesReducer from './slices/exercises-slice';
import tagsReducer from './slices/tags-slice';

const rootReducer = combineReducers({
  exercises: exercisesReducer,
  tags: tagsReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware(),
});
