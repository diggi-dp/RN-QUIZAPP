import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../../constants/theme';

const TimerSlide = ({ totalTimeInSecond, containerWidth = 150, onTimerEnd = () => { } }) => {
    const animation = useRef(new Animated.Value(0)).current;
    const [remainingTime, setRemainingTime] = useState(totalTimeInSecond);
    const startTime = useRef(performance.now());

    useEffect(() => {
        startAnimation();
        const timer = startTimer();

        return () => {
            stopAnimation();
            cancelAnimationFrame(timer);
        };
    }, []);

    useEffect(() => {
        if (remainingTime === 0) {
            stopAnimation();
            onTimerEnd();
        }
    }, [remainingTime]);

    const startAnimation = () => {
        const animationStartTime = performance.now();
        const animationDuration = totalTimeInSecond * 1000;
        const animationTick = (currentTime) => {
            const elapsedTime = currentTime - animationStartTime;
            const updatedValue = Math.min(elapsedTime / animationDuration, 1);

            animation.setValue(updatedValue);

            if (updatedValue < 1) {
                requestAnimationFrame(animationTick);
            }
        };

        requestAnimationFrame(animationTick);
    };

    const stopAnimation = useCallback(() => {
        animation.stopAnimation();
    }, []);

    const startTimer = useCallback(() => {
        const timerStartTime = performance.now();
        const timerTick = () => {
            const currentTime = performance.now();
            const elapsedTimeInSeconds = Math.floor((currentTime - timerStartTime) / 1000);
            const newTime = totalTimeInSecond - elapsedTimeInSeconds;

            if (newTime < 0) {
                setRemainingTime(0);
            } else {
                setRemainingTime(newTime);
                requestAnimationFrame(timerTick);
            }
        };

        requestAnimationFrame(timerTick);
    }, [totalTimeInSecond]);

    const getAnimatedValue = () => {
        const translateX = animation.interpolate({
            inputRange: [0, totalTimeInSecond],
            outputRange: [0, -containerWidth * totalTimeInSecond],
            extrapolate: 'clamp',
        });
        return { transform: [{ translateX }] };
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <View style={styles.container}>
            <View style={[styles.sliderContainer, { width: containerWidth }]}>
                <Animated.View style={[styles.slider, getAnimatedValue()]} />
            </View>
            <Text style={styles.time}>{formatTime(remainingTime)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sliderContainer: {
        height: 12,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    slider: {
        flex: 1,
        backgroundColor: COLORS.darkBlue,
    },
    time: {
        marginLeft: 12,
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.darkBlue,
    },
});

export default TimerSlide;



