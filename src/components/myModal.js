import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import Text from './text';
import Wrapper from './wrapper';
import {appStyles, colors, fontFamily} from '../services';

export const SuccessModal = ({
  description,
  onRequestClose,
  label,
  visible,
  transparent,
  ...restProps
}) => {
  return (
    <Modal
      {...restProps}
      animationType="slide"
      transparent={transparent}
      visible={visible}
      onRequestClose={onRequestClose}>
      <Wrapper style={styles.container}>
        <Wrapper justifyContentCenter alignItemsCenter style={styles.modal}>
          <Text alignTextCenter style={styles.heading} center>
            {label}
          </Text>
          <Text alignTextCenter style={styles.para}>
            {description}
          </Text>
        </Wrapper>
      </Wrapper>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    ...appStyles.shadowExtraDark,
    ...appStyles.paddingVerticalLarge,
    ...appStyles.paddingHorizontalLarge,
    backgroundColor: colors.cloud,
    borderRadius: 32,
    width: '80%',
    height: 'auto',
  },
  para: {
    color: colors.black,
    fontFamily: fontFamily.appTextBold,
  },
});
