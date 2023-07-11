import React, {Component, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

export default function App() {
  const [inputMessage, setInputMessage] = useState('');
  const [outputMessage, setOutputMessage] = useState(
    'Selamat datang di SereneMind',
  );
  const handleButtonClick = () => {
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {role: 'system', content: 'You are a helpful assistant.'},
          {role: 'user', content: inputMessage},
        ],
      }),
    })
      .then(response => response.json())
      .then(data => {
        setOutputMessage(data.choices[0].message.content);
      });
  };
  const handleTextInput = text => {
    setInputMessage(text);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text>{outputMessage}</Text>
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
        <TouchableOpacity onPress={handleButtonClick}>
          <View
            style={{
              backgroundColor: 'red',
              padding: 5,
            }}>
            <Text>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
