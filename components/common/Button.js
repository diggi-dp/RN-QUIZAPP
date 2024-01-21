import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../../constants/theme';


const Button = ({ title, onPress = () => { }, ...props }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}
            style={{
                height: 50,
                width: '100%',
                backgroundColor: COLORS.darkBlue,
                marginVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
                ...props
            }}>
            <Text style={{
                color: props.color ? props.color : COLORS.white,
                fontWeight: props.fontWeight ? props.fontWeight : 'bold', fontSize: 18
            }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;