import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { dummyMessages } from '../constants';
import { apiCall } from '../api/openAI';

export default function Features() {
    const [messages, setMessages] = useState(dummyMessages);
    const [result, setResult] = useState('');

    const handleTextInput = text => {
      setResult(text);
    };

    const fetchResponse = async ()=>{
        let newMessages = [...messages];
        newMessages.push({role: 'user', content: result.trim()});
        setMessages([...newMessages]);
        if(result.trim().length>0){
            apiCall(result.trim(), newMessages).then(res=>{
                console.log('got api data', res);
                if(res.success){
                  setMessages([...res.data]);
                
                }else{
                  Alert.alert('Error', res.msg);
                }
            })
        }
  }
  return (
    <View style={{height: hp(60)}} className="space-y-4">
      <Text style={{fontSize: wp(5)}} className="font-semibold text-gray-700 space-y-4">Talk With Seren</Text>
      {/* <View className="bg-purple-500 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
            <Image source={require('../../assets/images/logo.png')}  style={{width: wp(10), height: hp(5)}}/>
            <Text style={{fontSize: wp(3.5)}} className="font-semibold text-gray-100">
                SereneMind
            </Text>
        </View>
        <Text style={{fontSize: wp(3.5)}} className="text-gray-100">
            SereneMind
        </Text>
      </View>
      <View className="bg-purple-500 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
            <Image source={require('../../assets/images/logo.png')}  style={{width: wp(10), height: hp(5)}}/>
            <Text style={{fontSize: wp(3.5)}} className="font-semibold text-gray-100">
                SereneMind
            </Text>
        </View>
        <Text style={{fontSize: wp(3.5)}} className="text-gray-100">
            SereneMind
        </Text>
      </View>
      <View className="bg-purple-500 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
            <Image source={require('../../assets/images/logo.png')}  style={{width: wp(10), height: hp(5)}}/>
            <Text style={{fontSize: wp(3.5)}} className="font-semibold text-gray-100">
                SereneMind
            </Text>
        </View>
        <Text style={{fontSize: wp(3.5)}} className="text-gray-100">
            SereneMind
        </Text>
      </View> */}
      <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <ScrollView
          bounces={false}
          className="space-y-4"
          showsVerticalScrollIndicator={false}
        >
          {
              messages.map((messages, index)=>{
                  if (messages.role=='assistant') {
                      return (
                          <View
                              key={index}
                              style={{width: wp(70)}}
                              className="bg-purple-500 rounded-xl p-2 rounded-tl-none"
                          >
                              <Text
                                  className="text-white"
                              >
                                  {messages.content}
                              </Text>
                          </View>
                      )
                  } else if (messages.role=='user') {
                      return (
                          <View 
                              key={index} 
                              className="flex-row justify-end"
                          >
                              <View
                                  style={{width: wp(70)}}
                                  className="bg-gray-200 rounded-xl p-2 rounded-tr-none"
                              >
                                  <Text>
                                      {messages.content}
                                  </Text>
                              </View>
                          </View>
                      )
                  }
              })
          }
      </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <TextInput
            placeholder="Enter question"
            onChangeText={handleTextInput}
          />
        </View>
        <TouchableOpacity onPress={fetchResponse}>
          <View
            style={{padding: 5}}
            className="bg-purple-500"
            >
            <Text>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}