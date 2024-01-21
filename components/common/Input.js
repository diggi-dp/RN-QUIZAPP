import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { COLORS } from "../../constants/theme"
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const Input = ({ label, iconName, error, password, onFocus = () => { }, ...props }) => {

    const [isFocused, setIsFocused] = useState(false)
    const [hidePassword, setHidePassword] = useState(password)

    return (
        <View style={{ flex: 1, marginBottom: 10 }}>

            <Text style={styles.label}>
                {label}
            </Text>

            <View
                style={[
                    styles.inputContainer,
                    { borderColor: error ? COLORS.red : isFocused ? COLORS.blue : COLORS.light }
                ]}
            >

                <MaterialIcons name={iconName} size={22} color={COLORS.darkBlue} />

                <TextInput
                    style={{ color: COLORS.darkBlue, flex: 1, marginLeft: 10 }}
                    blurOnSubmit={false}
                    {...props}
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    onFocus={() => { onFocus(); setIsFocused(true) }}
                    onBlur={() => setIsFocused(false)}
                    returnKeyType="next"
                />

                {
                    password && <Ionicons
                        onPress={() => setHidePassword(!hidePassword)}
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        size={22}
                        color={COLORS.blue}
                    />
                }

            </View>

            {
                error && <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 7 }}>{error}</Text>
            }

        </View>
    )
}

export default Input



const styles = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: COLORS.grey
    },
    inputContainer: {
        height: 45,
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        borderWidth: 0.6,
        paddingHorizontal: 15,
        alignItems: 'center'
    }
})