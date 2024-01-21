import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { scale, verticalScale } from 'react-native-size-matters';
import { Stack, useRouter } from 'expo-router';
import UserInfo from '../../components/profile/UserInfo';
import Icon from '../../components/common/Icon';
import Loader from '../../components/common/Loader';
import ImagePickerModal from '../../components/profile/ImagePicker'
import { useDispatch, useSelector } from 'react-redux';
import { setToast } from '../../redux/slices/toastSlice';
import { setStatus, setUser } from '../../redux/slices/profileSlice'
import { EDITUSER } from '../../utils/axios';
import { STATUSES } from '../../constants/enum';
import NetworkInfo from '../../components/common/NetworkInfo';
import { editUserProfile } from '../../utils/services/user.Service';

const EditProfile = () => {
    const router = useRouter()

    const [modalVisible, setModalVisible] = useState(false);

    const { userData, status } = useSelector(state => state.profile)
    const { internetConnection } = useSelector(state => state.auth)

    const [editData, setEditData] = useState({ ...userData })


    const dispatch = useDispatch()


    // Function to select profile image 
    const selectImage = async () => {
        setModalVisible(true)
    };

    //saving user data
    const handleSaveUserData = async () => {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await editUserProfile(editData)
            if (res) {
                dispatch(setUser(editData))
                dispatch(setToast({
                    showToast: true, message: 'user data updated succesfully',
                    type: 'success'
                }));
            }

        } catch (error) {
            console.log({ 'error': error })
            dispatch(setToast({
                showToast: true, message: 'there was an error',
                type: 'error'
            }));
        } finally {
            dispatch(setStatus(STATUSES.IDLE))
        }
    }

    if (!internetConnection) {
        return <NetworkInfo />
    }

    if (status === STATUSES.LOADING) {
        return <Loader />
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                />

                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => { router.back() }}>
                        <Icon family={'Ionicons'} iconName="arrow-back" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.editButton} onPress={handleSaveUserData}>
                        <Text style={styles.editButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.profileContainer}>
                    <View>
                        {
                            editData?.profileImage ?
                                <Image
                                    source={{ uri: editData?.profileImage }}
                                    style={styles.profilePicture}
                                />
                                :
                                <Image
                                    source={require('../../assets/app_logo.png')}
                                    style={styles.profilePicture}
                                />
                        }

                        <TouchableOpacity style={styles.plusContainer} onPress={selectImage} >
                            <Icon family='FontAwesome' iconName='camera' size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.name}>{editData.firstName} {editData.lastName}</Text>
                    {/* <Text style={styles.status}>Available</Text> */}
                </View>

                <View style={styles.infoContainer}>
                    <UserInfo
                        family='FontAwesome'
                        iconName='user'
                        fieldName='First Name'
                        name='firstName'
                        text={`${editData?.firstName}`}
                        isEditable={true}
                        userSetterFunc={setEditData}
                    />
                    <UserInfo
                        family='FontAwesome'
                        iconName='user'
                        fieldName='Last Name'
                        name='lastName'
                        text={`${editData?.lastName}`}
                        isEditable={true}
                        userSetterFunc={setEditData}
                    />
                    <UserInfo
                        family='FontAwesome'
                        fieldName='User Name'
                        name='userName'
                        text={editData?.userName}
                        iconName='user'
                        isEditable={true}
                        userSetterFunc={setEditData}
                    />
                    <UserInfo
                        family='MaterialIcons'
                        fieldName='Email'
                        name='email'
                        text={editData?.email}
                        iconName='mail'
                    />

                </View>

            </ScrollView>

            <ImagePickerModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                userSetterFunc={setEditData}
            />

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        marginTop: verticalScale(20),
    },
    backButton: {
        padding: scale(8),
    },
    editButton: {
        padding: scale(8),
    },
    editButtonText: {
        fontSize: scale(16),
        fontWeight: 'bold',
        color: COLORS.darkBlue,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: verticalScale(20),
    },
    profilePicture: {
        width: scale(150),
        height: scale(150),
        borderRadius: scale(150 / 2),
        resizeMode: 'contain',
        borderWidth: 0.5,
        borderColor: COLORS.darkBlue
    },
    name: {
        marginTop: verticalScale(14),
        fontSize: scale(18),
        fontWeight: 'bold',
    },
    status: {
        marginTop: 8,
        fontSize: 16,
        color: 'gray',
    },
    infoContainer: {
        marginTop: verticalScale(30),
        paddingHorizontal: scale(20),
    },
    plusContainer: {
        position: 'absolute',
        backgroundColor: COLORS.darkBlue,
        borderRadius: scale(100),
        padding: scale(12),
        right: 0,
        bottom: 0
    }

});

export default EditProfile;