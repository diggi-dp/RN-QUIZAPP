import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import NetInfo from '@react-native-community/netinfo'
import { useDispatch } from "react-redux";
import { setInternetConnection } from "../../redux/slices/authSlice";

export default function NetworkInfo() {

  const dispatch = useDispatch()

  const onRefresh = () => {
    NetInfo.refresh().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      dispatch(setInternetConnection(state.isConnected))
    });
  }

  // Error Type 01
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: COLORS.light
      }}

    >
      <Image
        source={require('../../assets/noInternet.jpg')}
        style={{
          width: Dimensions.get('screen').width - 80,
          height: 320,
        }}
        resizeMode="contain"
      />
      <Text style={{
        color: '#000',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',

      }}>
        {`No Internet Connection.`}
      </Text>
      <Text
        style={{
          color: '#000',
          fontWeight: '500',
          fontSize: 16,
          marginVertical: 10,
        }}

      >
        Please check your internet connection
      </Text>
      <TouchableOpacity
        onPress={() => onRefresh()}
        style={{
          backgroundColor: '#d8d8d8',
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginTop: 10,
          borderRadius: 20,
          borderWidth: 1
        }}
      >
        <Text
          style={{
            color: '#000',
            fontWeight: '600',
            fontSize: 14,
          }}
        >Refresh</Text>
      </TouchableOpacity>
    </View>
  )
}
