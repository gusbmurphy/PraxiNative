import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {appStyles} from '../../app-styles';

export const EditField: FunctionComponent<{fieldName: string}> = ({
  fieldName,
  children,
}) => {
  return (
    <View style={[styles.editField, appStyles.listItem]}>
      <Text style={appStyles.bodyText}>{fieldName}: </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  editField: {
    flexDirection: 'row',
    marginBottom: 7,
  },
});
