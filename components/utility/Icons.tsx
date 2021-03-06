import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const FooterIcon = ({icon}: {icon: IconProp}) => {
  return (
    <FontAwesomeIcon icon={icon} style={styles.screenFooterButton} size={30} />
  );
};

export const InlineIcon = ({icon}: {icon: IconProp}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <FontAwesomeIcon icon={icon} style={styles.inlineButton} size={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenFooterButton: {
    color: '#3192ff',
    marginTop: 20,
    marginHorizontal: 30,
  },
  inlineButton: {
    color: '#3192ff',
    marginHorizontal: 10,
  },
});
