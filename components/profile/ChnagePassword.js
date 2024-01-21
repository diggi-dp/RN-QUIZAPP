import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants/theme'
import { useDispatch } from 'react-redux'
import { setToast } from '../../redux/slices/toastSlice'
import { UPDATEPASSWORD } from '../../utils/axios'
import { updateUserPassword } from '../../utils/services/user.Service'

const ChnagePassword = ({ isPassModalVisible, setIsPassModalVisible, setToastMessage }) => {

    const dispatch = useDispatch()

    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: ''
    })


    const fetchPassword = async () => {
        try {
            const res = await updateUserPassword(password);

            dispatch(
                setToast({
                    showToast: true,
                    message: res.data,
                    type: 'success',
                })
            );
            cancelPassword();
            setPassword(null);
        } catch (error) {
            console.error('Fetch password failed:', error.message);

            dispatch(
                setToast({
                    showToast: true,
                    message: error.message,
                    type: 'error',
                })
            );

            cancelPassword();
            setPassword(null);
        }
    };

    const cancelPassword = () => {
        setIsPassModalVisible(false)
    }

    const savePassword = () => {
        if (password.oldPassword !== '' && password.newPassword !== '') {
            if (password.newPassword.length >= 6) {
                fetchPassword()
            } else {
                setPassword(null)
                dispatch(
                    setToast({
                        showToast: true,
                        message: 'min password length is 6 ',
                        type: 'warn',
                    })
                );
            }
        }else{
            dispatch(
                setToast({
                    showToast: true,
                    message: 'Fileds can not be empty',
                    type: 'warn',
                })
            );
        }
    }

    const handleChangeText = (field, text) => {
        setPassword(pre => {
            return { ...pre, [field]: text }
        })
    }


    return (
        <>
            <Modal visible={isPassModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder='old Password'
                            secureTextEntry={true}
                            style={styles.input}
                            value={password?.oldPassword}
                            onChangeText={(text) => handleChangeText('oldPassword', text)}
                        />
                        <TextInput
                            placeholder='new Password'
                            secureTextEntry={true}
                            style={styles.input}
                            value={password?.newPassword}
                            onChangeText={(text) => handleChangeText('newPassword', text)}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button(COLORS.red)} onPress={cancelPassword}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button(COLORS.darkBlue)} onPress={savePassword}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </>
    )
}

export default ChnagePassword


const styles = StyleSheet.create({
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
        fontSize: 18,
        borderWidth: 1.4,
        borderColor: '#CCC',
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: (color) => ({
        backgroundColor: color,
        paddingVertical: 8,
        borderRadius: 5,
        width: 90,
    }),
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})