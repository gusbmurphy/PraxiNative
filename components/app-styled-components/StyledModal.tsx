import React, {ComponentProps} from 'react';
import {StyleSheet} from 'react-native';
import {Modal, Portal} from 'react-native-paper';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
  },
});

export const StyledModal = (props: ComponentProps<typeof Modal>) => (
  <Portal>
    <Modal {...props} style={styles.modal} />
  </Portal>
);
