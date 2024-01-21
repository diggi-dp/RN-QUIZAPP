import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { COLORS } from '../../constants/theme';
import { scale, verticalScale } from 'react-native-size-matters';
import Icon from '../common/Icon'
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';

const UserInfo = ({ fieldName, text, family, iconName, isEditable, userSetterFunc, name }) => {

    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState(text)


    const handleChangeText = (newvalue) => {
        setValue(newvalue)
    }

    // Function to handle the edit button press
    const handleEditButtonPress = () => {
        setIsVisible(true);
    };

    // Function to handle saving the input value
    const handleSave = () => {
        handleCancel()
        userSetterFunc(pre => {
            return { ...pre, [name]: value }
        });
    };

    // Function to handle canceling the input
    const handleCancel = () => {
        setIsVisible(false);
    };

    return (
        <>
            <View style={styles.infoItem}>
                <View style={{ flex: 1, flexDirection: 'row', gap: scale(22), alignItems: 'center' }}>
                    <Icon family={family} name={iconName} size={24} color={COLORS.darkBlue} />
                    <View style={{ flex: 1 }} >
                        <Text style={styles.infoLabel}>{fieldName}</Text>
                        <Text style={styles.infoValue}>{text}</Text>

                    </View>
                </View>
                {
                    isEditable &&
                    <TouchableOpacity style={styles.editIcon} onPress={handleEditButtonPress}>
                        <Icon family='FontAwesome5' name='pen' size={22} color={COLORS.darkBlue} />
                    </TouchableOpacity>
                }
            </View>

            <Modal visible={isVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput style={styles.input} value={value} onChangeText={handleChangeText} />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button(COLORS.red)} onPress={handleCancel}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button(COLORS.darkBlue)} onPress={handleSave}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>



        </>
    )
}

export default UserInfo




const styles = StyleSheet.create({
    infoItem: {
        marginBottom: verticalScale(18),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoLabel: {
        fontSize: scale(14),
        fontWeight: 'bold',
    },
    infoValue: {
        fontSize: scale(13),
    },
    editIcon: {
        marginRight: scale(14),
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFF',
        width: '80%',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        height: 56,
        backgroundColor: 'white',
        marginBottom: 20,
        paddingHorizontal: 16,
        fontSize:18,
        borderWidth: 1.4,
        borderColor: '#CCC',
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: (color)=>({
        backgroundColor: color,
        paddingVertical: 8,
        borderRadius: 5,
        width:90
    }),
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf:'center'
    }
})