interface BaseExerciseParameter {
  title: string;
  id: string;
}

export interface RangeExerciseParameter extends BaseExerciseParameter {
  min: number;
  max: number;
}

export type SetValue = string;
export interface SetExerciseParameter<T extends SetValue>
  extends BaseExerciseParameter {
  values: T[];
}

export type ExerciseParameter =
  | RangeExerciseParameter
  | SetExerciseParameter<any>;
