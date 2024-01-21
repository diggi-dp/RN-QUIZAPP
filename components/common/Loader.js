import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator,Modal } from 'react-native';

import { COLORS } from '../../constants/theme';

const Loader = ({ visible = true }) => {
  const { width, height } = useWindowDimensions();

  return (
    <Modal isVisible={visible} style={styles.modal} backdropOpacity={0.5}>
      <View style={[styles.container, { width, height }]}>
        <View style={styles.loader}>
          <ActivityIndicator size='large' color={COLORS.success} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    height: 70,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 18,
    marginLeft: 16,
    color: COLORS.darkBlue,
  },
});
