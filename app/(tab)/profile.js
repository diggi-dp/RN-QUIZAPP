import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native'
import { COLORS } from '../../constants/theme'
import { scale, verticalScale } from 'react-native-size-matters'
import ProfileOption from '../../components/profile/ProfileOption';
import Icon from '../../components/common/Icon';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import Loader from '../../components/common/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmBox from '../../components/common/Confirm';
import ChnagePassword from '../../components/profile/ChnagePassword';
import { useDispatch, useSelector } from 'react-redux';
import { setToast } from '../../redux/slices/toastSlice';
import { setUser, setStatus } from '../../redux/slices/profileSlice';
import { STATUSES } from '../../constants/enum';
import { logoutUser } from '../../utils/services/auth.Service';
import { deleteUserAccount, getUserProfile } from '../../utils/services/user.Service'
import NetworkInfo from '../../components/common/NetworkInfo';



const ProfileScreen = () => {
    const router = useRouter()
    const navigation = useNavigation()

    const [refreshing, setRefreshing] = useState(false)

    const dispatch = useDispatch()

    const { userData, status } = useSelector(state => state.profile)
    const { internetConnection } = useSelector(state => state.auth)
    const { result } = useSelector(state => state.user)


    const [islogoutBoxVisible, setIslogoutBoxVisible] = useState(false)
    const [isDeleteBoxVisible, setIsDeleteBoxVisible] = useState(false)
    const [isPassModalVisible, setIsPassModalVisible] = useState(false)


    const getUserData = async () => {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await getUserProfile()
            if (res.data.error) {
                dispatch(setToast({
                    showToast: true, message: res.data.error,
                    type: 'error'
                }));

                router.replace('/login')
            } else {
                dispatch(setUser(res.data))
                dispatch(setStatus(STATUSES.IDLE))
            }
        } catch (error) {
            console.log('No response received:', error);
            console.log('Error:', error.message);
        } finally {
            dispatch(setStatus(STATUSES.IDLE))
        }

    }

    // for triggering every mount && internet check
    // useFocusEffect(useCallback(() => {
    //     getUserData()
    // }, []))

    useEffect(() => {
        getUserData()
    }, [])

    // logout handler
    const logoutConfirm = async () => {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await logoutUser()
            if (res) {
                await AsyncStorage.removeItem('quizToken')
                setIslogoutBoxVisible(false)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'login' }]
                })
            }

        } catch (error) {
            // Handle error
            if (error.response) {
                dispatch(setToast({
                    showToast: true, message: error.response.status,
                    type: 'error'
                }));
            } else if (error.request) {
                // The request was made but no response was received
                console.log('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.log('Error:', error.message);
            }
        } finally {
            dispatch(setStatus(STATUSES.IDLE))
        }
    }

    const logoutCancel = () => {
        setIslogoutBoxVisible(false)
    }

    // delete account handler
    const deleteConfirm = async () => {
        console.log('trigger')
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await deleteUserAccount()

            if (res) {
                await AsyncStorage.removeItem('quizToken')
                setIslogoutBoxVisible(false)
                dispatch(setStatus(STATUSES.IDLE))
                router.replace('/login')
            }

        } catch (error) {
            if (error.response) {
                dispatch(setToast({
                    showToast: true, message: error.message,
                    type: 'error'
                }));
            }
            dispatch(setStatus(STATUSES.ERROR))

        }
    }

    const deleteCancel = () => {
        setIsDeleteBoxVisible(false)
    }


    const onRefresh = () => {
        getUserData()
        setRefreshing(false)
    }

    if (!internetConnection) {
        return <NetworkInfo />;
    }

    if (status === STATUSES.LOADING) {
        return <Loader />
    }

    // if (status === STATUSES.ERROR) {
    //     // return <ErrorScreen />
    //     router.push('/Error')
    // }


    return (
        <>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                <View style={styles.header}>

                    <TouchableOpacity
                        style={styles.menu}
                        onPress={() => { }}
                    >
                        <Icon family='Ionicons' name="menu" size={30} color={COLORS.darkBlue} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => router.push({ pathname: "/profile/editProfile" })}
                    >
                        <Icon family='FontAwesome5' name="user-edit" size={22} color={COLORS.darkBlue} />
                    </TouchableOpacity>

                </View>

                <View style={styles.profilecontainer}>
                    {
                        userData?.profileImage ?
                            <Image
                                source={{ uri: userData?.profileImage }}
                                style={styles.profileImage}
                            />
                            :
                            <Image
                                source={require('../../assets/app_logo.png')}
                                style={styles.profileImage}
                            />
                    }
                    <View style={styles.profileDescription}>
                        <Text style={styles.full_name}>{userData?.firstName} {userData?.lastName}</Text>
                        <Text style={styles.user_name}>{userData?.userName}</Text>
                    </View>
                </View>

                <View style={styles.info}>
                    <Icon family='AntDesign' name="mail" size={22} color={COLORS.darkBlue} />
                    <Text style={{ color: 'gray' }}>{userData?.email}</Text>
                </View>

                <View style={[styles.box, styles.shadow]}>
                    <View style={styles.result_box}>
                        <Text style={styles.result_no}>{result.length}</Text>
                        <Text style={styles.result_text}>Quiz Played</Text>
                    </View>
                    <View style={styles.result_box}>
                        <Text style={styles.result_no}>
                            {result.reduce((acc, item) => acc + item.correct, 0)}
                        </Text>
                        <Text style={styles.result_text}>Total Points</Text>
                    </View>
                </View>


                <ProfileOption
                    family='Ionicons'
                    iconName='settings-outline'
                    size={28}
                    color={COLORS.darkBlue}
                    text='Settings'
                    onPress={() => console.warn('pressed')}
                />

                <ProfileOption
                    family='MaterialCommunityIcons'
                    iconName='lock-reset'
                    size={28}
                    color={COLORS.darkBlue}
                    text='Change Password'
                    onPress={() => setIsPassModalVisible(true)}

                />

                <ProfileOption
                    family='MaterialIcons'
                    iconName='logout'
                    size={28}
                    color={COLORS.red}
                    text='Logout'
                    onPress={() => setIslogoutBoxVisible(true)}
                />

                <ProfileOption
                    family='AntDesign'
                    iconName='deleteuser'
                    size={28}
                    color={COLORS.red}
                    text='Delete Account'
                    onPress={() => setIsDeleteBoxVisible(true)}
                />

                {/* confirm box for logout  */}
                <ConfirmBox
                    visible={islogoutBoxVisible}
                    title='Logout'
                    message='sure you want to logout?'
                    onConfirm={logoutConfirm}
                    onCancel={logoutCancel}
                />
                {/* confirm box for delete account  */}
                <ConfirmBox
                    visible={isDeleteBoxVisible}
                    title='Delete Account'
                    message='sure you want to Delete this Account?'
                    onConfirm={deleteConfirm}
                    onCancel={deleteCancel}
                />

                {/* modal for user password change  */}
                <ChnagePassword
                    isPassModalVisible={isPassModalVisible}
                    setIsPassModalVisible={setIsPassModalVisible}
                />
            </ScrollView>
        </>
    )
}

export default ProfileScreen



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light,
        paddingHorizontal: scale(20),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: verticalScale(12),
        marginTop: verticalScale(20),
    },
    menu: {
        paddingVertical: verticalScale(8),
    },
    editButton: {
        padding: scale(8),
    },
    profilecontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(20),
        marginVertical: verticalScale(10)
    },
    profileImage: {
        width: scale(80),
        height: scale(80),
        borderRadius: scale(80 / 2),
        borderWidth: 0.3,
        borderColor: COLORS.darkBlue
    },
    profileDescription: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    full_name: {
        fontSize: scale(22),
        fontWeight: 'bold',
        color: COLORS.darkBlue
    },
    user_name: {
        marginTop: 8,
        fontSize: scale(15),
        color: 'gray',
    },
    info: {
        flexDirection: 'row',
        gap: scale(20),
        marginVertical: verticalScale(16)
    },
    box: {
        flexDirection: 'row',
        marginVertical: verticalScale(20),
        backgroundColor: COLORS.light,
        padding: 5
    },
    result_box: {
        flex: 2,
        alignItems: 'center'
    },
    result_no: {
        fontSize: scale(19),
        fontWeight: '700',
        color: COLORS.darkBlue
    },
    result_text: {
        fontSize: scale(13)
    },
    shadow: {
        shadowColor: 'gray',
        elevation: 20,
    },

})