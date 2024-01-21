import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { setToast } from '../../redux/slices/toastSlice';

const Toast = ({ duration = 2000 }) => {
    // const { message, type, showToast } = toastMessage;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const { message, type, showToast } = useSelector(state => state.toast)
    const dispatch = useDispatch()

    useEffect(() => {
        if (showToast) {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(duration),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Reset toast state
                dispatch(setToast({ message: '', type: 'success', showToast: false }));
            });
        }
    }, [duration, fadeAnim, showToast]);

    if (!showToast) {
        return null;
    }

    return (
        <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
            <View style={styles.toastContent(type)}>
                <Text style={styles.toastText}>{message}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        bottom: scale(20),
        left: scale(20),
        right: scale(20),
        alignItems: 'center',
        zIndex: 1000000
    },
    toastContent: (type) => ({
        backgroundColor: COLORS[type],
        padding: 10,
        borderRadius: 8,
    }),
    toastText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Toast;





