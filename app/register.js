import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Keyboard,
    ScrollView,
    SafeAreaView,
    Image,
    KeyboardAvoidingView
} from 'react-native';
import { COLORS } from '../constants/theme';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { scale, verticalScale } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../redux/slices/profileSlice'
import { STATUSES } from '../constants/enum';
import { setToast } from '../redux/slices/toastSlice'
import { registerUser } from '../utils/services/auth.Service';
import NetworkInfo from '../components/common/NetworkInfo'



const Register = () => {
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
    });
    const [error, setError] = useState({})
    const { status } = useSelector(state => state.profile)
    const { internetConnection } = useSelector(state => state.auth)
    const dispatch = useDispatch()


    const validate = () => {
        Keyboard.dismiss()
        let valid = true

        if (!inputs.firstName) {
            handleError("Firstname cant't be empty", 'firstName')
            valid = false
        }
        if (!inputs.lastName) {
            handleError("lastName cant't be empty", 'lastName')
            valid = false
        }
        if (!inputs.userName) {
            handleError("userName cant't be empty", 'userName')
            valid = false
        }

        if (!inputs.email) {
            handleError("email cant't be empty", 'email')
            valid = false
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError("please input valid email", 'email')
            valid = false
        }

        if (!inputs.password) {
            handleError("password cant't be empty", 'password')
            valid = false
        } else if (inputs.password.length < 6) {
            handleError("min password length of 6", 'password')
            valid = false
        }

        if (valid) {
            register()
        }
    }


    const register = async () => {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await registerUser(inputs)
            if (res) {
                dispatch(setStatus(STATUSES.IDLE))
                dispatch(setToast({
                    showToast: true, message: 'user register succesfully',
                    type: 'success'
                }));
            }

        } catch (error) {
            dispatch(setToast({
                showToast: true, message: 'something went wrong',
                type: 'error'
            }));
        }
    }


    const handleOnChange = (text, input) => {
        setInputs(pre => (
            { ...pre, [input]: text }
        ))
    }

    const handleError = (errorMessage, input) => {
        setError(pre => ({ ...pre, [input]: errorMessage }))
    }


    if (!internetConnection) {
        return <NetworkInfo />
    }

    if (status === STATUSES.LOADING) {
        return <Loader />
    }


    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView enabled={true}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: verticalScale(40),
                        paddingBottom: verticalScale(60),
                        paddingHorizontal: scale(20),
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        backgroundColor: COLORS.light,
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <Text style={styles.registerText}>REGISTER</Text>
                            <Text style={styles.detailsText}>
                                Enter your details to register
                            </Text>
                        </View>
                        <Image
                            source={require('../assets/signupboot.png')}
                            style={{
                                width: '50%',
                                height: 160,
                                resizeMode: 'contain',
                                marginVertical: 30,
                            }}
                        />
                    </View>


                    <View style={{ marginVertical: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row', gap: 3, justifyContent: 'space-between' }}>
                            <Input
                                placeholder='First Name'
                                label='FirstName'
                                iconName='account-box'
                                error={error?.firstName}
                                onFocus={() => handleError(null, 'firstName')}
                                onChangeText={text => handleOnChange(text, 'firstName')}
                            />
                            <Input
                                placeholder='Last Name'
                                label='LastName'
                                iconName='account-box'
                                error={error?.lastName}
                                onFocus={() => handleError(null, 'lastName')}
                                onChangeText={text => handleOnChange(text, 'lastName')}
                            />
                        </View>
                        <Input
                            placeholder='Enter Your email'
                            label='Email'
                            iconName='email'
                            error={error?.email}
                            onFocus={() => handleError(null, 'email')}
                            keyboardType='email-address'
                            onChangeText={text => handleOnChange(text, 'email')}
                        />
                        <Input
                            placeholder='Enter Your userName'
                            label='UserName'
                            iconName='account-box'
                            error={error?.userName}
                            onFocus={() => handleError(null, 'userName')}
                            onChangeText={text => handleOnChange(text, 'userName')}
                        />
                        <Input
                            placeholder='Enter Your password'
                            label='Password'
                            iconName='security'
                            error={error?.password}
                            onFocus={() => handleError(null, 'password')}
                            password={true}
                            onChangeText={text => handleOnChange(text, 'password')}
                        />

                        <Button title='Register' onPress={validate} />

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Register


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.darkBlue },
    registerText: { fontSize: scale(30), color: COLORS.black, fontWeight: 'bold' },
    detailsText: { fontSize: scale(15), color: COLORS.grey, marginVertical: verticalScale(8) },
}
)