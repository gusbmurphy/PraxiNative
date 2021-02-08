import React from 'react';
import {ExerciseListScreen} from './ExerciseList';
import {store} from '../../store';
import {Provider as StoreProvider} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

afterAll(cleanup);

describe('Exercise List Screen', () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  const screen = (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen name="Exercises" component={ExerciseListScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );

  const {getByA11yLabel, findByText} = render(screen);

  it("has a button that adds a new exercise to the store when it's pressed", async () => {
    const button = getByA11yLabel('add new exercise');

    await waitFor(() => expect(button).toBeTruthy());

    fireEvent(button, 'press');

    const exercisesState = store.getState().exercises;

    await waitFor(() => expect(exercisesState.items.length).toBe(1));
    await waitFor(() =>
      expect(exercisesState.items[0].title).toBe('New Exercise'),
    );
  });

  const exerciseEntry = findByText('New Exercise');

  it('adds an entry for that new exercise', async () => {
    await waitFor(() => expect(exerciseEntry).toBeTruthy());
  });

  it('navigates to the exercise edit screen when the entry is pressed', async () => {});
});
