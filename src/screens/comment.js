import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {responsiveHeight, responsiveWidth} from '../components/Responsive';

import {BASE_URL} from '../config';

import Header from '../components/Header';
import Date from '../components/Date';
import {AuthContext} from '../context/AuthContext';

const Comment = ({navigation}) => {
  const {userToken} = useContext(AuthContext);
  const [comment, setComment] = useState([]);
  const route = useRoute();
  const id = route.params?.id;

  const fetchComment = async () => {
    try {
      console.log(id);
      const res = await axios.get(`${BASE_URL}/comments-post/${id}`);
      setComment(res.data.response);
      console.log(res.data.response);
    } catch (error) {
      // handle error
    }
  };

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      fetchComment();
    });
    return unSubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <Header title="Komen" btnRight="disabled" />

      {/* CONTOH MAPPING */}
      <View>
        {comment.length != 0 ? (
          comment.map((item, index) => (
            <View key={index}>
              <Text>{item.user.name}</Text>
              <Date
                style={{
                  fontWeight: 'normal',
                  fontSize: 12,
                }}
                timestamp={item.createdAt}
              />
            </View>
          ))
        ) : (
          <Text>Tidak ada komentar</Text>
        )}
        {/* CONTOH MAPPING */}

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            marginHorizontal: 25,
            marginTop: 25,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
          <Image style={styles.image} source={require('../images/user.png')} />
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              padding: 10,
              marginTop: 10,
            }}>
            <Text style={{color: 'grey', fontWeight: 'bold'}}>T</Text>
            <Text style={{color: 'grey'}}>T</Text>
          </View>
          <TouchableOpacity>
            <Image
              style={{
                width: responsiveWidth(30),
                height: responsiveHeight(30),
                marginTop: 10,
              }}
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
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginLeft: 25,
    marginTop: 25,
    marginBottom: 25,
    width: 40,
    height: 40,
  },
});

export default Comment;
