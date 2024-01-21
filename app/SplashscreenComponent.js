import React, { useEffect, useRef } from 'react';
import { COLORS } from '../constants/theme';
import { SafeAreaView, StyleSheet, View, Animated, Easing } from 'react-native';
import { scale } from 'react-native-size-matters';

const SplashscreenComponent = () => {
  const rotateValueHolder = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotationAnimation();
  }, []);

  const startRotationAnimation = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Animated.Image
          style={[
            styles.logo,
            {
              transform: [{ rotate: rotateData }],
            },
          ]}
          source={require('../assets/app_logo.png')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: scale(150),
    height: scale(150),
    resizeMode: 'contain',
    borderRadius: scale(150 / 2),
  },
});

export default SplashscreenComponent;

