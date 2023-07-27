import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '../config';

const Timeline = ({navigation}) => {
  const [getTimeline, setGettimeline] = useState([]);
  const [description, setDescription] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const PostTimeLine = async () => {
    let token = await AsyncStorage.getItem('userToken');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(
        `${BASE_URL}/post`,
        {
          description: description,
        },
        {
          headers: headers,
        },
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
        console.log(token);
      })
      .finally(() => setIsLoading(false));
  };

  const fetchTimeLine = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/all-posts`);
      console.log(res.data.response);
      setGettimeline(res.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      fetchTimeLine();
    });

    PostTimeLine();
    return unSubscribe;
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    fetchTimeLine();
  };

  return (
    <View style={{flex: 1}}>
      <Header title="Timeline" btnLeft="disabled" btnRight="disabled" />
      <View style={styles.create}>
        <Image style={styles.image} source={require('../images/user.png')} />
        <TextInput
          value={description}
          onChangeText={text => setDescription(text)}
          multiline
          style={{width: 190, marginLeft: 15, color: 'grey'}}
          placeholder="Tulis cerita..."
          placeholderTextColor={'grey'}
        />
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              description ? PostTimeLine(description) : '';
            }}>
            <Image
              style={{width: 25, height: 25, marginLeft: 0}}
              source={require('../images/paper-plane.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          style={{marginTop: 2}}
          source={require('../images/camera.png')}
        />
        <Text style={{marginLeft: 7, marginBottom: 15, color: '#7286D3'}}>
          Tambah gambar
        </Text>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{backgroundColor: '#d9d9d9', flex: 1}}>
        {getTimeline.map((data, i) => (
          <View key={i}>
            <View
              style={{
                marginHorizontal: 25,
                backgroundColor: 'white',
                flexDirection: 'row',
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                marginTop: 10,
              }}>
              <Image
                style={styles.image}
                source={require('../images/user.png')}
              />
              <Text style={{width: 190, padding: 15, color: 'grey'}}>
                {data.description}
              </Text>
              <TouchableOpacity>
                <Image
                  style={{width: 25, height: 25, marginTop: 15}}
                  source={require('../images/more.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginHorizontal: 25,
                backgroundColor: 'white',
                flexDirection: 'row',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                marginBottom: 15,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <Image
                  style={{marginTop: 2}}
                  source={require('../images/circle-up.png')}
                />
                <Text style={{color: '#7286D3', marginHorizontal: 10}}>
                  0 Dukungan
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <Image
                  style={{marginTop: 2}}
                  source={require('../images/comment.png')}
                />
                <Text style={{color: '#7286D3', marginHorizontal: 10}}>
                  0 Komen
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  create: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
  },
  image: {
    marginLeft: 25,
    marginTop: 25,
    marginBottom: 25,
    width: 60,
    height: 60,
  },
});

export default Timeline;
