import React from 'react';
import {store} from '../../store';
import {Provider as StoreProvider} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {RootStackParamList} from '../../../App';
import {ExerciseEditScreen} from '.';
import {cleanup} from '@testing-library/react-native';

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

afterAll(cleanup);

describe('Exercise Edit Screen', () => {
  // const RootStack = createStackNavigator<RootStackParamList>();

  // const screen = (
  //   <StoreProvider store={store}>
  //     <PaperProvider>
  //       <NavigationContainer>
  //         <RootStack.Navigator>
  //           <RootStack.Screen
  //             name="ExerciseEdit"
  //             component={ExerciseEditScreen}
  //           />
  //         </RootStack.Navigator>
  //       </NavigationContainer>
  //     </PaperProvider>
  //   </StoreProvider>
  // );

  test.todo('has a text input that corresponds to the name');
  test.todo(
    'has a section titled "Tags" that shows the current tags for the exercise, and has a button that brings up a modal to add a tag',
  );
  test.todo(
    'has section titled "Parameters" that shows the current parameters, and has a button that brings up a modal to add new parameters',
  );
});
