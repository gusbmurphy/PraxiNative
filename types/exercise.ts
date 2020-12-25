import {ExerciseParameter} from './exercise-parameter';

export type Exercise = {
  title: string;
  id: string;
  tagIds: string[];
  parameters: ExerciseParameter[];
};
