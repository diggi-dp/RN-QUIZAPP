import React, { useState } from 'react';
import { View, Button, Modal, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from '../common/Icon';
import { scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/theme';

const ImagePickerModal = ({ modalVisible, setModalVisible, userSetterFunc }) => {


    const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const openImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!result.canceled) {
            const res = await fetch(result.assets[0].uri)
            const blob = await res.blob()
            const base64Image = await convertBlobToBase64(blob)
            console.log(base64Image)
            userSetterFunc(pre => {
                return { ...pre, ['profileImage']: base64Image }
            });
            closeModal()
        }
    };

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access the camera is required.');
            return;
        }

        
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            const res = await fetch(result.assets[0].uri)
            const blob = await res.blob()
            const base64Image = await convertBlobToBase64(blob)
            console.log(base64Image)
            userSetterFunc(pre => {
                return { ...pre, ['profileImage']: base64Image }
            });
            closeModal()
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <Modal
                visible={modalVisible} animationType={'slide'}
                transparent={true} onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>

                    <View style={styles.imagePickerContainer}>

                        <TouchableOpacity onPress={openCamera} style={styles.btn} >
                            <Icon family='FontAwesome' iconName='camera' size={28} color={COLORS.darkBlue} />
                            <Text style={styles.btn_text}>Open Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={openImagePicker} style={styles.btn} >
                            <Icon family='FontAwesome' iconName='photo' size={30} color={COLORS.darkBlue} />
                            <Text style={styles.btn_text}>Open Galary</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={closeModal} style={styles.btn} >
                            <Icon family='MaterialIcons' iconName='cancel' size={30} color={COLORS.red} />
                            <Text style={[styles.btn_text, { color: COLORS.red }]} >Close</Text>
                        </TouchableOpacity>
                    </View>

                    {/* {
                        selectedImage && (
                            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                        )
                    } */}

                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: scale(0)
    },
    // selectedImage: {
    //     width: 200,
    //     height: 200,
    //     marginTop: 20,
    // },
    imagePickerContainer: {
        backgroundColor: 'gray',
        height: verticalScale(200),
        width: '100%',
        paddingHorizontal: scale(20),
        borderTopLeftRadius: scale(14),
        borderTopRightRadius: scale(14),
    },
    btn: {
        flexDirection: 'row',
        gap: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scale(10),
        backgroundColor: 'white',
        borderRadius: scale(20),
        paddingVertical: scale(5)
    },
    btn_text: {
        fontSize: scale(14),
        color: COLORS.darkBlue
    }
});

export default ImagePickerModal;
