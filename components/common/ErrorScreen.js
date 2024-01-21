import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import { useRouter } from "expo-router";


export default function ErrorScreen() {

  const router = useRouter()

  // Error Type 01
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.light
      }}
      
    >
      <Image
        source={require('../../assets/404.gif')}
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
        {`Oops! You weren't\nsupposed to see this.`}
      </Text>
      <Text
        style={{
          color: '#000',
          fontWeight: '600',
          fontSize: 12,
          marginVertical: 10,
        }}
      >
        The page you were looking was loading incorrectly.
      </Text>
      <TouchableOpacity
        onPress={() => router.push('/home')}
        style={{
          backgroundColor: '#000',
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginTop: 10,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            color: '#FFF',
            fontWeight: '600',
            fontSize: 14,
          }}
        >GO HOME</Text>
      </TouchableOpacity>
    </View>
  )
}


