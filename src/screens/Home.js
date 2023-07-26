import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {SimpleGrid} from 'react-native-super-grid';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';

import {BASE_URL} from '../config';

import Header from '../components/Header';

const location = 'Home';
const color = [
  '#C0392B',
  '#E74C3C',
  '#D35400',
  '#E67E22',
  '#1ABC9C',
  '#16A085',
  '#3498DB',
  '#2980B9',
  '#9B59B6',
  '#8E44AD',
];

const Home = () => {
  const navigation = useNavigation();
  const {userToken} = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  });

  const getData = () => {
    axios
      .get(`${BASE_URL}/chats`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {});
  };

  const randomColor = () => {
    return color[Math.floor(Math.random() * 10)];
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7'}}>
      <Header title="Serene Mind" btnLeft="disabled" btnRight={() => test()} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView style={{padding: 20}}>
          <Text style={styles.sectionTitle}>Obrolan Suara</Text>
          <View style={styles.voiceChatCard}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{fontSize: 16, color: '#ffffff'}}>
                Kamu bisa ngobrol dengan seren menggunakan percakapan suara!
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('VoiceChat')}>
              <Image source={require('../images/recording.png')} />
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Obrolan Teks</Text>
          <View style={[styles.defaultCard, {marginBottom: 20}]}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.flexCenter}>
                <Image source={require('../images/starter-logo.png')} />
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{fontSize: 16, color: '#313131'}}>
                  Halo, aku Seren! Aku adalah teman ngobrol AI kamu!
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnStartTextChat}
              onPress={() => navigation.navigate('TextChat')}>
              <Text style={{color: '#FFFFFF'}}>Ayo ngobrol!</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={[styles.sectionTitle, {flex: 1}]}>
              Riwayat Obrolan
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Text style={styles.textLink}>Lihat semua riwayat</Text>
            </TouchableOpacity>
          </View>
          <SimpleGrid
            itemDimension={150}
            data={data}
            style={{marginBottom: 20}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.defaultCard,
                  {
                    height: 150,
                    backgroundColor: '#C0392B',
                  },
                ]}>
                <Text style={styles.historyTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#313131',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  voiceChatCard: {
    backgroundColor: '#F94A29',
    borderRadius: 6,
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  defaultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 15,
    elevation: 2,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStartTextChat: {
    backgroundColor: '#7286D3',
    width: '100%',
    height: 50,
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  historyTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textLink: {
    color: '#7286D3',
  },
});

export default Home;
