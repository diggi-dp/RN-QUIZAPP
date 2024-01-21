import { StyleSheet, Text, Pressable } from "react-native"
import { scale, verticalScale } from "react-native-size-matters"
import Icon from "../common/Icon"

const ProfileOption = ({ family, iconName, size, color, text,onPress }) => {

    return (
        <Pressable onPress={() => onPress()} style={[styles.info, { alignItems: 'center' }]}>
            <Icon
                family={family}
                iconName={iconName}
                size={size}
                color={color}
            />
            <Text
                style={styles.text(color)}
            >
                {text}
            </Text>
        </Pressable>
    )
}

export default ProfileOption

const styles = StyleSheet.create({
    info: {
        flexDirection: 'row',
        gap: scale(20),
        marginVertical: verticalScale(16)
    },
    text: (clr) => (
        {
            fontSize: scale(15),
            color: clr,
            fontWeight: '500'
        }
    )
})