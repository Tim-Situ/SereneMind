import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useCallback, useEffect, useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GiftedChat, Bubble, Composer, Send} from 'react-native-gifted-chat';
import axios from 'axios';

import {BASE_URL} from '../config';

import Header from '../components/Header';
import {AuthContext} from '../context/AuthContext';

const TextChat = ({route}) => {
  const {userToken, userProfile} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const {id} = route.params;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        setMessages(res.data.data);
      })
      .catch(err => {
        // handle error
      });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7'}}>
      <Header title="Obrolan Teks" btnLeft="enabled" btnRight="disabled" />
      <GiftedChat
        messages={messages}
        renderAvatar={() => {}}
        scrollToBottom={true}
        alwaysShowSend={true}
        renderLoading={() => (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Memuat chat...</Text>
            <Text>
              TIPS: Jika pesan lama dimuat silahkan kembali ke menu lalu coba
              lagi.
            </Text>
          </View>
        )}
        textInputStyle={styles.defaultInput}
        onSend={messages => onSend(messages)}
        user={{
          _id: userProfile.id,
          name: userProfile.name,
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
        renderComposer={props => {
          return (
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity style={{marginLeft: 10}}>
                  <View
                    style={[styles.btnSubmit, {backgroundColor: '#ffffff'}]}>
                    <Icon name="microphone" size={20} color={'#7286D3'} />
                  </View>
                </TouchableOpacity>
              </View>
              <Composer {...props} />
              <Send {...props}>
                <View style={{marginRight: 10}}>
                  <View style={styles.btnSubmit}>
                    <Icon name="send" size={20} color={'#ffffff'} />
                  </View>
                </View>
              </Send>
            </View>
          );
        }}
      />
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
  defaultInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    color: '#313131',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginRight: 15,
    elevation: 2,
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
  },
  btnSubmit: {
    backgroundColor: '#7286D3',
    width: 40,
    height: 40,
    borderRadius: 25,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TextChat;
