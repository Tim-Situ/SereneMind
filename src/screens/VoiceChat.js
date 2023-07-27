import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble, Composer, Send} from 'react-native-gifted-chat';
import Voice from '@react-native-community/voice';

import Header from '../components/Header';

const VoiceChat = () => {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [result, setResult] = useState('');

  const speechStartHandler = e => {};

  const speechEndHandler = e => {
    setRecording(false);
  };
  const speechResultsHandler = e => {
    console.log('voice event:', e);
    const text = e.value[0];
    setResult(text);
  };

  const speechErrorHandler = e => {
    setRecording(false);
  };

  const startRecording = async () => {
    setRecording(true);
    try {
      await Voice.start('id-ID');
    } catch (err) {
      // handle error
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);
    } catch (err) {
      // handle error
    }
  };

  useEffect(() => {
    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    return () => {
      // destroy the voice instance after component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Serene',
        },
      },
    ]);
  }, []);

  useEffect(() => {
    let message = {
      _id: Math.random().toString(36).substring(7),
      text: result,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'Fauzein',
      },
    };
    if (result != '') {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [message]),
      );
    }
  }, [result]);

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7'}}>
      <Header title="Obrolan Suara" btnLeft="enabled" btnRight="disabled" />
      <GiftedChat
        messages={messages}
        renderAvatar={() => {}}
        scrollToBottom={true}
        alwaysShowSend={true}
        textInputStyle={styles.defaultInput}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: 'Fauzein',
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={styles.bubbleText}
              wrapperStyle={styles.bubbleWrapper}
            />
          );
        }}
        renderInputToolbar={() => {}}
        minInputToolbarHeight={0}
        maxComposerHeight={0}
        minComposerHeight={0}
      />
      <View
        style={{
          padding: 20,
          alignItems: 'center',
          backgroundColor: '#ffffff',
          elevation: 2,
        }}>
        {recording ? (
          <>
            <TouchableOpacity onPress={stopRecording}>
              <Image source={require('../images/listening.png')} />
            </TouchableOpacity>
            <Text style={{marginTop: 20}}>Listening...</Text>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={startRecording}>
              <Image source={require('../images/recording.png')} />
            </TouchableOpacity>
            <Text style={{marginTop: 20}}>Tekan untuk berbicara</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleText: {
    left: {
      color: '#313131',
    },
    right: {
      color: '#ffffff',
    },
  },
  bubbleWrapper: {
    left: {
      backgroundColor: '#ffffff',
      padding: 5,
      marginBottom: 10,
      elevation: 2,
    },
    right: {
      backgroundColor: '#7286D3',
      padding: 5,
      marginBottom: 10,
      elevation: 2,
    },
  },
});

export default VoiceChat;
