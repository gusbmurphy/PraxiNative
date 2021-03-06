import React, {ComponentProps} from 'react';
import {Chip} from 'react-native-paper';
import {appStyles} from '../app-styles';
import color from 'color';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  chip: {
    margin: 4,
  },
});

export const StyledChip = (
  props: ComponentProps<typeof Chip> & {
    color?: string;
  },
) => {
  if (!props.color) {
    return <Chip style={styles.chip} {...props} />;
  }

  let stylesWithColor = [
    styles.chip,
    {
      backgroundColor: color(props.color).alpha(0.2).rgb().string(),
    },
  ];

  return (
    <Chip
      style={stylesWithColor}
      {...props}
      selectedColor={props.color}
      selected
    />
  );
};
