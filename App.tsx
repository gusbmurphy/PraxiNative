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
import {HomeScreen} from './screens/Home';
import {ExercisesListScreen} from './screens/ExerciseList';
import {Provider} from 'react-redux';
import {store} from './store';
import {SafeAreaView} from 'react-native-safe-area-context';

export type RootStackParamList = {
  Home: undefined;
  Exercises: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
      <Provider store={store}>
        {/* <SafeAreaView> */}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Welcome'}}
            />
            <Stack.Screen name="Exercises" component={ExercisesListScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* </SafeAreaView> */}
      </Provider>
    </>
  );
};

export default App;
