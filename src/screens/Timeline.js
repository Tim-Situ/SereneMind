import {View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity,  RefreshControl, Alert} from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveHeight, responsiveWidth } from '../components/Responsive';

const Timeline = ({navigation}) => {
  const [getTimeline, setGettimeline] = useState([])
  const BASE_URL = 'https://serenemind-gateway.ulya.my.id'
  const [description, setDescription] = useState('')
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);



const PostTimeLine = async () => {
  let token = await AsyncStorage.getItem('userToken');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  axios
      .post(`${BASE_URL}/post`, {
        description: description
      },
      {
        headers: headers
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err)
        console.log(token)
      })
      .finally(() => setIsLoading(false), onRefresh())
}

const DeleteTimeline = async (id) => {
   let token = await AsyncStorage.getItem('userToken');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  axios.delete(`${BASE_URL}/post/${id}`, {headers})
  .then(res => {
    console.log(res.data.response)
    onRefresh()

  })
}

const fetchTimeLine = async() =>{
    try {
      const res = await axios.get(`${BASE_URL}/all-posts`);
      console.log(res.data.response);
      setGettimeline(res.data.response.reverse())
    } catch (error) {
      console.log(error);
    }
}
      

useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
        fetchTimeLine();

      });
    return unSubscribe;

},[navigation])

const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 100);
    fetchTimeLine()
};

const DeleteFuntion = (id) =>
    Alert.alert('Hapus', 'Yakin menghapus komentar?', [
      {
        text: 'Batal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: `Hapus`, onPress: () => DeleteTimeline(id)},
]);

  return (
    <View style={{flex: 1}}>
       <Header title="Timeline" btnLeft="disabled" btnRight="disabled" />
        <View style={styles.create}>
            <Image
                  style={styles.image}
                  source={require('../images/user.png')}
            />
            <TextInput value={description} onChangeText={text => setDescription(text)}  multiline style={{flex:1,marginLeft:15, color: 'grey'}} placeholder='Tulis cerita...' placeholderTextColor={'grey'}/> 
            <TouchableOpacity onPress={() => {description ?  PostTimeLine(description) : ''}} style={{marginRight: 30, marginTop: 30}}>
              <Image style={{width: 25, height: 25}} source={require('../images/paper-plane.png')} />
            </TouchableOpacity>
            
        </View>
        <View style={{backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center'}}>
              <Image style={{marginTop: 2}} source={require('../images/camera.png')}/>
              <Text style={{marginLeft: 7,marginBottom: 15,color: '#7286D3'}}>Tambah gambar</Text>
        </View> 
       

        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } style={{backgroundColor: '#d9d9d9',flex: 1}}>
          
          {getTimeline.map((data, index) => (
            <View key={index}>
              <View style={{flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 25, marginTop: 25, borderTopLeftRadius: 15, borderTopRightRadius:15}}>
                <Image
                      style={styles.image}
                      source={require('../images/user.png')}
                />
                <Text style={{flex: 1,color: 'grey', padding: 10}}>{data.description}</Text>
                <TouchableOpacity onPress={() => DeleteFuntion(data.id)} key={data.id}>
                  <Image style={{width: responsiveWidth(30), height: responsiveHeight(30), marginTop: 10}} source={require('../images/more.png')} />
                </TouchableOpacity>
              </View>
              <View style={{marginHorizontal: 25, backgroundColor: 'white', flexDirection: 'row', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, marginBottom: 15}}>
                <TouchableOpacity style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: "center", marginBottom: 15}}>
                  <Image style={{marginTop: 2}} source={require('../images/circle-up.png')}/>
                  <Text style={{color: '#7286D3',marginHorizontal : 10}}>0 Dukungan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: "center", marginBottom: 15}} onPress={() => navigation.navigate('Comment')}>
                  <Image style={{marginTop: 2}} source={require('../images/comment.png')}/>
                  <Text style={{color: '#7286D3',marginHorizontal : 10}}>0 Komen</Text>
                </TouchableOpacity>
                  
              </View>
            </View>
          
          ))}

        </ScrollView>
    </View>
          
    
    
  );
};

const styles = StyleSheet.create({
  defaultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 15,
    elevation: 2,
  },
  create:{
    backgroundColor: 'white',
    marginTop: 5,
    flexDirection: 'row',
  },
  image:{
    marginLeft: 25,
    marginTop: 25,
    marginBottom: 25,
    width: 40,
    height: 40,
  }
});

export default Timeline;