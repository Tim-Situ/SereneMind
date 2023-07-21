import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

import Header from '../components/Header';

const VoiceChat = () => {
  const data = [
    {
      role: 'system',
      content: 'Kamu adalah teman saya',
    },
    {
      role: 'user',
      content: 'Nama saya adalah Fauzein, umur saya 19 tahun',
    },
    {
      role: 'assistant',
      content:
        'Hai Fauzein, senang bertemu denganmu! Bagaimana kabarmu? Ada yang seru terjadi belakangan ini?',
    },
    {
      role: 'user',
      content: 'berapa umur saya?',
    },
    {
      role: 'assistant',
      content:
        'Anda mengatakan bahwa umur Anda adalah 19 tahun. Jadi, jika saya tidak salah, umur Anda adalah 19 tahun. Benar kan?',
    },
    {
      role: 'user',
      content:
        'saya sangat hobi ngoding, saya ingin menjadi seorang backend dev handal, saya pernah menggunakan bahasa pemrograman java, c++, python dan PHP. Namun saya sangat suka sekali dengan bahasa pemrograman PHP',
    },
    {
      role: 'assistant',
      content:
        'Itu hebat, Fauzein! Sangat menyenangkan melihat minatmu dalam ngoding dan menjadi seorang backend developer handal. Bahasa pemrograman PHP adalah pilihan yang bagus untuk belajar dalam pengembangan web. Untuk meningkatkan keahlianmu dalam PHP, kamu bisa mencoba membangun proyek-proyek kecil, mengikuti tutorial online, atau bahkan bergabung dengan komunitas pengembang PHP untuk berkolaborasi dan belajar bersama. Jangan lupa juga untuk terus mengupdate diri dengan perkembangan terbaru dalam bahasa pemrograman PHP. Semoga sukses dalam perjalananmu menjadi seorang backend developer yang handal! Jika kamu butuh bantuan atau ada yang ingin kamu diskusikan seputar pemrograman, jangan ragu untuk mengajukan pertanyaan kepadaku.',
    },
    {
      role: 'user',
      content: 'Apa bahasa pemrograman kesukaan saya?',
    },
    {
      role: 'user',
      content: 'Apa bahasa pemrograman kesukaan saya?',
    },
    {
      role: 'user',
      content: 'Apa bahasa pemrograman kesukaan saya?',
    },
    {
      role: 'user',
      content: 'Apa bahasa pemrograman kesukaan saya?',
    },
    {
      role: 'user',
      content: 'Apa bahasa pemrograman kesukaan saya?',
    },
    {
      role: 'user',
      content: 'Apa bahasa pemrograman kesukaan saya?',
    },
    {
      role: 'user',
      content: 'Apa bahasa pemrograman kesukaan saya?',
    },
    {
      role: 'user',
      content: 'Apa bahasa pemrograman kesukaan saya?',
    },
    {
      role: 'user',
      content: 'Apa bahasa pemrograman kesukaan saya?',
    },
    {
      role: 'user',
      content: 'Apa bahasa pemrograman kesukaan saya?',
    },
    {
      role: 'user',
      content: 'Apa bahasa pemrograman kesukaan saya?',
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7'}}>
      <Header title="Obrolan Suara" btnLeft="enabled" btnRight="disabled" />
      <View style={{flex: 1}}>
        <ScrollView style={{padding: 20}}>
          {data.length > 1 ? (
            <View style={{paddingBottom: 20}}>
              {data.map((item, index) => {
                if (item.role == 'assistant') {
                  return (
                    <View key={index} style={styles.assistantBubble}>
                      <Text
                        style={[
                          styles.bubbleText,
                          {borderBottomLeftRadius: 0},
                        ]}>
                        Assistant Response
                      </Text>
                    </View>
                  );
                } else if (item.role == 'user') {
                  return (
                    <View key={index} style={styles.userBubble}>
                      <Text
                        style={[
                          styles.bubbleText,
                          {
                            backgroundColor: '#7286D3',
                            color: '#ffffff',
                            borderBottomRightRadius: 0,
                          },
                        ]}>
                        User Response
                      </Text>
                    </View>
                  );
                }
              })}
            </View>
          ) : (
            <View></View>
          )}
        </ScrollView>
      </View>
      <View style={{padding: 20, alignItems: 'center'}}>
        <TouchableOpacity>
          <Image source={require('../images/listening.png')} />
        </TouchableOpacity>
        <Text style={{marginTop: 20}}>Listening...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  assistantBubble: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  userBubble: {
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  bubbleText: {
    backgroundColor: '#ffffff',
    width: '80%',
    fontSize: 16,
    color: '#313131',
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
    borderRadius: 10,
  },
});

export default VoiceChat;
