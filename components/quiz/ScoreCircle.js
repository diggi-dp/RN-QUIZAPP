import { View, Text } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { COLORS } from '../../constants/theme'
import { TouchableOpacity } from 'react-native'

const ScoreCircle = ({ data, name, onPress, outerViewstyle, innerViewStyle }) => {


    return (
        <View
            style={[{
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                marginBottom: 0
            }, outerViewstyle]}>
            <TouchableOpacity
                onPress={onPress}
                style={[{
                    backgroundColor: '#9E7DF2',
                    width: scale(50), height: scale(50),
                    borderRadius: scale(50) / 2,
                    justifyContent: 'center', alignItems: 'center'
                }, innerViewStyle]}>
                <Text
                    style={{ color: COLORS.light, fontSize: 16, fontWeight: '500' }}
                >
                    {data}
                </Text>
            </TouchableOpacity>
            <Text style={{ color: COLORS.black, marginTop: 6, fontSize: 14 }}>{name}</Text>
        </View>
    )
}

export default ScoreCircle