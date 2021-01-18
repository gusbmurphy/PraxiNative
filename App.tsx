/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './components/screens/Home';
import {ExercisesListScreen} from './components/screens/ExerciseList';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './store';
import {ExerciseEditScreen} from './components/screens/exercise-edit';
import {NavigationBar} from './components/NavigationBar';

export type RootStackParamList = {
  Home: undefined;
  Exercises: undefined;
  ExerciseEdit: {id: string};
};
const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
      <StoreProvider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <RootStack.Navigator
              screenOptions={{header: (props) => <NavigationBar {...props} />}}>
              <RootStack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: 'Welcome'}}
              />
              <RootStack.Screen
                name="Exercises"
                component={ExercisesListScreen}
              />
              <RootStack.Screen
                name="ExerciseEdit"
                component={ExerciseEditScreen}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </>
  );
};

export default App;
