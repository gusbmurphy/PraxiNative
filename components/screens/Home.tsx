import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {Surface, Button} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

export const HomeScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}) => {
  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Exercises')}>
          All Exercises
        </Button>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  surface: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
