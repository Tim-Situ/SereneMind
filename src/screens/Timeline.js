import {View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext.js';

const location = 'Timeline';

const Timeline = () => {
  const [getTimeline, setGettimeline] = useState([])
  const BASE_URL = 'https://serenemind-gateway.ulya.my.id'

  useEffect(() => {
      async function fetchTimeline(){
        try {
          const res = await axios.get(`${BASE_URL}/all-posts`);
          console.log(res.data.response);
          setGettimeline(res.data.response)
        } catch (error) {
          console.log(error);
        }
      }

      fetchTimeline();

  },[])


  return (
    <View style={{flex: 1}}>
       <Header title="Timeline" btnLeft="disabled" btnRight="disabled" />
        <View style={styles.create}>
            <Image
                  style={styles.image}
                  source={require('../images/user.png')}
            />
            <TextInput multiline style={{width: 250,marginLeft:15}} placeholder='Tulis cerita...'/>  
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity>
                <Image style={{width: 25, height: 25, marginLeft:25}} source={require('../images/paper-plane.png')} />
              </TouchableOpacity>
            </View>
            
        </View>
        <View style={{backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center'}}>
              <Image style={{marginTop: 2}} source={require('../images/camera.png')}/>
              <Text style={{marginLeft: 7,marginBottom: 15,color: '#7286D3'}}>Tambah gambar</Text>
        </View>
       

        <ScrollView style={{backgroundColor: '#d9d9d9',flex: 1}}>
          
          {getTimeline.map((data, i) => (
            <View key={i}>
              <View style={{marginHorizontal: 25, backgroundColor: 'white', flexDirection: 'row', borderTopRightRadius: 15, borderTopLeftRadius: 15, marginTop: 10}}>
                <Image
                      style={styles.image}
                      source={require('../images/user.png')}
                />
                <Text style={{width: 270, padding: 15}}>{data.description}</Text>
                <TouchableOpacity>
                  <Image style={{width: 25, height: 25, marginTop: 15}} source={require('../images/more.png')} />
                </TouchableOpacity>
              </View>
              <View style={{marginHorizontal: 25, backgroundColor: 'white', flexDirection: 'row', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, marginBottom: 15}}>
                <TouchableOpacity style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: "center", marginBottom: 15}}>
                  <Image style={{marginTop: 2}} source={require('../images/circle-up.png')}/>
                  <Text style={{color: '#7286D3',marginHorizontal : 10}}>0 Dukungan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: "center", marginBottom: 15}}>
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
  create:{
    backgroundColor: 'white',
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
  },
  image:{
    marginLeft: 25,
    marginTop: 25,
    marginBottom: 25,
    width: 60,
    height: 60,
  }
});

export default Timeline;
