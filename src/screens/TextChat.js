import {View, StyleSheet} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';

import Header from '../components/Header';

const TextChat = () => {
  const [messages, setMessages] = useState([]);

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
        renderSend={props => {
          return (
            <Send {...props}>
              <View style={{marginRight: 10, marginBottom: 5}}>
                <View style={styles.btnSubmit}>
                  <Icon name="send" size={20} color={'#ffffff'} />
                </View>
              </View>
            </Send>
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
