import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 flex justify-between bg-white">
      <View className="space-y-2 top-48">
        <View className="flex-row justify-center mb-5">
            <Image source={require('../../assets/images/logo.png')}  style={{width: wp(29), height: hp(15)}}/>
        </View>
        <Text style={{fontSize: wp(8)}} className="text-center mb-5 font-bold text-violet-500">
            SereneMind
        </Text>
        <Text style={{fontSize: wp(3.5)}} className="text-center tracking-wider text-gray-700 font-semibold">
            Selamat datang di SereneMind! Kenalin aku Seren, aku adalah asisten kesehatan mental mu.
        </Text>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} className="bg-purple-500 mx-5 p-4 rounded-2xl">
        <Text style={{fontSize: wp(5)}} className="text-center text-white font-bold text-2xl">Mulai</Text>
      </TouchableOpacity>
      <View className="flex-row justify-center">
        <Text>(This is development version)</Text>
      </View>
    </SafeAreaView>
  )
}