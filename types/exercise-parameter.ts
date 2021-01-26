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
  values: {content: T; id: string}[];
}

export type ExerciseParameter =
  | RangeExerciseParameter
  | CollectionExerciseParameter<any>;

export function isRangeParameter(
  parameter: any,
): parameter is RangeExerciseParameter {
  return 'max' in parameter && 'min' in parameter;
}

export function isCollectionParameter(
  parameter: any,
): parameter is CollectionExerciseParameter<CollectionValue> {
  return 'values' in parameter;
}
