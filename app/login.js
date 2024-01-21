import React, { useState } from 'react';
import {
  View,
  Text,
  Keyboard,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Pressable,
  TouchableOpacity
} from 'react-native';
import { COLORS } from '../constants/theme';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale } from 'react-native-size-matters';

import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../redux/slices/profileSlice'
import { STATUSES } from '../constants/enum';
import { setToast } from '../redux/slices/toastSlice';
import { loginUser } from '../utils/services/auth.Service';
import NetworkInfo from '../components/common/NetworkInfo';


const LoginScreen = () => {
  const { status } = useSelector(state => state.profile)
  const { internetConnection } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const router = useRouter()
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState({})


  const handleOnChange = (text, input) => {
    setInputs(pre => (
      { ...pre, [input]: text }
    ))
  }

  const handleError = (errorMessage, input) => {
    setError(pre => ({ ...pre, [input]: errorMessage }))
  }


  const handleLogin = () => {
    Keyboard.dismiss()
    let valid = true

    if (!inputs.email) {
      handleError("email cant't be empty", 'email')
      valid = false
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("please input valid email", 'email')
      valid = false
    }

    if (inputs.password.length < 6) {
      handleError("min password length is 6", 'password')
    }

    if (valid) {
      userlogin()
    }
  }


  const userlogin = async () => {
    dispatch(setStatus(STATUSES.LOADING))
    try {

      const token = await loginUser({
        email: inputs.email,
        password: inputs.password
      })

      await AsyncStorage.setItem('quizToken', token)
      setInputs({})
      router.replace('/home')

    } catch (error) {
      console.warn(error.response.status)
      dispatch(setToast({
        showToast: true, message: error.response.message,
        type: 'error'
      }));
    } finally {
      dispatch(setStatus(STATUSES.IDLE))
    }
  }


  if (!internetConnection) {
    return <NetworkInfo />;
  }


  if (status === STATUSES.LOADING) {
    return <Loader />
  }


  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView enabled={true} behavior='none'>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: verticalScale(80),
            paddingBottom: verticalScale(60),
            paddingHorizontal: scale(20),
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: COLORS.light,
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row' }}>

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Text style={styles.loginText}>LOGIN</Text>
              <Text style={styles.welcomeText}>
                Welcome to Quizzora
              </Text>
            </View>

            <Image
              source={require('../assets/loginboot.png')}
              style={{
                width: scale(160),
                height: verticalScale(145),
                resizeMode: 'contain',
                marginVertical: verticalScale(30),
              }}
            />

          </View>


          <View style={{ marginVertical: verticalScale(18) }}>
            <Input
              placeholder='Enter Your email'
              label='Email'
              iconName='email'
              value={inputs.email}
              error={error?.email}
              onFocus={() => handleError(null, 'email')}
              keyboardType='email-address'
              onChangeText={text => handleOnChange(text, 'email')}
            />

            <Input
              placeholder='Enter Your password'
              label='Password'
              iconName='security'
              value={inputs.password}
              error={error?.password}
              onFocus={() => handleError(null, 'password')}
              password={true}
              onChangeText={text => handleOnChange(text, 'password')}

            />

            <Button title='Login' onPress={handleLogin} />

          </View>

          <Text
            style={[styles.registerTextStyle, { color: COLORS.darkBlue }]}
            onPress={() => router.push('/register')}
          >
            Forgot Password ?
          </Text>

          <Text style={styles.registerTextStyle}>or</Text>

          <View style={styles.loginOptions}>
            <Pressable onPress={() => console.warn('pressed')}>
              <Image style={styles.img} source={require('../assets/icons/google.png')} />
            </Pressable>
            <Pressable onPress={() => console.warn('pressed')}>
              <Image style={styles.img} source={require('../assets/icons/facebook_icon.png')} />
            </Pressable>
          </View>

          <Text
            style={[styles.registerTextStyle, { marginBottom: verticalScale(50), color: COLORS.darkBlue }]}
            onPress={() => router.push('/register')}>
            New Here ? Register
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.darkBlue },
  loginText: { fontSize: scale(30), color: COLORS.black, fontWeight: 'bold' },
  welcomeText: { fontSize: scale(15), color: COLORS.grey, marginVertical: verticalScale(8) },
  registerTextStyle: {
    color: 'gray',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scale(14),
    alignSelf: 'center',
    padding: scale(4),
  },
  loginOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginVertical: verticalScale(10)

  },
  img: {
    width: scale(50),
    height: verticalScale(50)
  }
})