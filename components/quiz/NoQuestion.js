import { View, Text } from 'react-native'
import React from 'react'
import Button from '../common/Button'
import { useRouter } from 'expo-router'
import { scale } from 'react-native-size-matters'
import { COLORS } from '../../constants/theme'

const NoQuestion = () => {
    const router = useRouter()
    return (
        <View style={{ alignSelf: 'center', padding: 20, margin: 'auto' }}>
            <Text
                style={{ fontSize: 24, fontWeight: '700' }}
            >
                I apologize for the inconvenience. There are no questions available at the moment.
            </Text>
            <Button
                title={'Go back'}
                onPress={() => router.back()}
                borderRadius={10}
                height={scale(32)}
                width={scale(100)}
                borderColor={COLORS.darkBlue}
                borderWidth={1}
                backgroundColor={COLORS.light}
                color={COLORS.darkBlue}
                fontWeight={'500'}
            />
        </View>
    )
}

export default NoQuestion