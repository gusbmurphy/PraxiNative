import reducer, {
  exerciseActions as actions,
  initialState,
} from './exercises-slice';

describe('Exercises Slice', () => {
  const testTitle = 'abcdefg';
  let state = initialState;

  it('adds a new exercise to the state given just a title with the "addExercise" action', () => {
    state = reducer(state, actions.addExercise({title: testTitle}));

    expect(
      state.items.findIndex((exercise) => exercise.title === testTitle),
    ).toBe(0);
  });

  it('appends a number to the end of a title if that title exists', () => {
    state = reducer(state, actions.addExercise({title: testTitle}));

    expect(
      state.items.findIndex((exercise) => exercise.title === testTitle + ' 1'),
    ).toBe(1);
  });

  it("doesn't append number if the title exists as a part of a longer title", () => {
    const extendedTestTitle = testTitle + 'hijklmnop';

    let extendedTitleState = reducer(
      initialState,
      actions.addExercise({title: extendedTestTitle}),
    );
    extendedTitleState = reducer(
      extendedTitleState,
      actions.addExercise({title: testTitle}),
    );

    expect(
      extendedTitleState.items.findIndex(
        (exercise) => exercise.title === testTitle + ' 1',
      ),
    ).toBe(-1);
  });

  it("appends a number 1 greater than the previous number if this isn't the first duplicate", () => {
    const numOfDuplicates = Math.floor(1 + Math.random() * 20);
    let duplicatesState = initialState;
    for (let i = 0; i < numOfDuplicates; i++) {
      duplicatesState = reducer(
        duplicatesState,
        actions.addExercise({title: testTitle}),
      );

      if (i > 0) {
        expect(
          duplicatesState.items[duplicatesState.items.length - 1].title,
        ).toBe(testTitle + 1);
      }
    }
  });
});
