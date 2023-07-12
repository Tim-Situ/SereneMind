import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Features from '../components/Features';
import { dummyMessages } from '../constants';
import Voice from '@react-native-community/voice';
import { apiCall } from '../api/openAI';

export default function HomeScreen() {
    const [messages, setMessages] = useState(dummyMessages);
    const [recording, setRecording] = useState(false);
    const [speaking, setSpeaking] = useState(true);

    const speechStartHandler = (e) => {
        console.log('speech start handler');
    }
    const speechEndHandler = (e) => {
        setRecording(false);
        console.log('speech end handler');
    }
    const speechResultsHandler = (e) => {
        console.log('voice event:', e); 
        const text = e.value[0];
        fetchResponse(text);
    }
    const speechErrorHandler = (e) => {
        console.log('voice event error:', e);
    }

    const startRecording = async () => {
        setRecording(true);
        try {
            await Voice.start('id-ID');
        } catch (error) {
            console.log('error:', error)
        }
    }

    const stopRecording = async () => {
        try {
            await Voice.stop();
            setRecording(false);
        } catch (error) {
            console.log('error', error);
        }
    }

    const fetchResponse = async (result)=>{
        let newMessages = [...messages];
        newMessages.push({role: 'user', content: result.trim()});
        setMessages([...newMessages]);
        console.log(messages)
        if(result.trim().length>0){
            // setLoading(true);
            

            // scroll to the bottom of the view
            //   updateScrollView();

            // fetching response from chatGPT with our prompt and old messages
            apiCall(result.trim(), newMessages).then(res=>{
                console.log('got api data', res);
                // setLoading(false);
                if(res.success){
                  setMessages([...res.data]);
                //   updateScrollView();

                  // now play the response to user
                //   startTextToSpeach(res.data[res.data.length-1]);
                
                }else{
                  Alert.alert('Error', res.msg);
                }
            })
        }
  }

    const clear = () => {
        setMessages(dummyMessages);
    }
    const stopSpeaking = () => {
        setSpeaking(false);
    }

    useEffect(()=>{
        // voice handler events
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;
        Voice.onSpeechError = speechErrorHandler;

        return () => {
            // destroy the voice instance after component unmounts
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, [])
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        {/* bot icon */}
        <View className="flex-row justify-center">
            <Image source={require('../../assets/images/logo.png')}  style={{width: wp(29), height: hp(15)}}/>
        </View>
        {/* features || messages */}
        {
            messages.length>1? (
                <View className="space-y-2 flex-1">
                    <Text style={{fontSize: wp(4)}} className="text-gray-800 font-semibold ml-1">
                        Assistant
                    </Text>
                    <View
                        style={{height: hp(50)}}
                        className="bg-neutral-200 rounded-3xl p-4"
                    >
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
                                                    className="bg-white rounded-xl p-2 rounded-tr-none"
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
                </View>
            ):(
                <View>
                    <Text style={{fontSize: wp(5)}} className="font-semibold text-gray-700 mb-5">Voice Talks</Text>
                    <View className="bg-purple-500 p-4 rounded-xl space-y-2 mb-5">
                        <View className="flex-row items-center justify-between space-x-1">
                            <Text style={{fontSize: wp(3.5)}} className="text-gray-100">
                                Kamu bisa mengobrol dengan seren menggunakan percakapan suara!
                            </Text>
                        <Text style={{fontSize: wp(3.5)}} className="text-gray-100">
                            {
                                recording? (
                                    <TouchableOpacity onPress={stopRecording}>
                                        {/* recording stop button */}
                                        <Image 
                                            className="rounded-full" 
                                            source={require('../../assets/images/voiceLoading.gif')}
                                            style={{width: hp(10), height: hp(10)}}
                                        />
                                    </TouchableOpacity>
                                ):(
                                    <TouchableOpacity onPress={startRecording}>
                                        {/* recording start button */}
                                        <Image 
                                            className="rounded-full" 
                                            source={require('../../assets/images/recordingIcon.png')}
                                            style={{width: hp(10), height: hp(10)}}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        </Text>
                        </View>
                    </View>
                    <Features />
                </View>
            )
        }
        {/* recording, clear and stop buttons */}
        {
            messages.length>1 ? (
                <View className="flex justify-center items-center">
                    {
                        recording? (
                            <TouchableOpacity onPress={stopRecording}>
                                {/* recording stop button */}
                                <Image 
                                    className="rounded-full" 
                                    source={require('../../assets/images/voiceLoading.gif')}
                                    style={{width: hp(10), height: hp(10)}}
                                />
                            </TouchableOpacity>
                        ):(
                            <TouchableOpacity onPress={startRecording}>
                                {/* recording start button */}
                                <Image 
                                    className="rounded-full" 
                                    source={require('../../assets/images/recordingIcon.png')}
                                    style={{width: hp(10), height: hp(10)}}
                                />
                            </TouchableOpacity>
                        )
                    }
                    {
                        messages.length>1 && (
                        <TouchableOpacity
                            onPress={clear}
                            className="bg-neutral-400 rounded-3xl p-2 absolute right-10"
                        >
                            <Text className="text-white font-semibold">Clear</Text>
                        </TouchableOpacity>
                    )
                    }
                    {
                        speaking && (
                        <TouchableOpacity 
                            onPress={stopSpeaking}
                            className="bg-red-400 rounded-3xl p-2 absolute left-10"
                        >
                            <Text className="text-white font-semibold">Stop</Text>
                        </TouchableOpacity>
                        )
                    }
                </View>
            ):(
                <View> 
                </View>
            )
        }
      </SafeAreaView>
    </View>
  )
}