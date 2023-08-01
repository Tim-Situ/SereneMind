import {View, Text} from 'react-native';
import React, {useState} from 'react';
import TextChat from './TextChat';
import VoiceChat from './VoiceChat';

import Header from '../components/Header';

const Chat = ({route}) => {
  const {id, mode} = route.params;
  const [changeMode, setChangeMode] = useState(mode);

  const handleMode = () => {
    setChangeMode(changeMode == 'Text' ? 'Voice' : 'Text');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7'}}>
      <Header title="Obrolan Suara" btnLeft="enabled" btnRight="disabled" />
      {changeMode == 'Text' ? (
        <TextChat chatId={id} handleMode={handleMode} />
      ) : (
        <VoiceChat chatId={id} handleMode={handleMode} />
      )}
    </View>
  );
};

export default Chat;
