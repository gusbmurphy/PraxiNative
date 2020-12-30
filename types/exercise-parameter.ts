interface BaseExerciseParameter {
  title: string;
  id: string;
}

export interface RangeExerciseParameter extends BaseExerciseParameter {
  min: number;
  max: number;
}

export type CollectionValue = string;
export interface CollectionExerciseParameter<T extends CollectionValue>
  extends BaseExerciseParameter {
  values: T[];
}

export type ExerciseParameter =
  | RangeExerciseParameter
  | CollectionExerciseParameter<any>;
