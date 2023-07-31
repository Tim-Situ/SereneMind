import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState }from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { useRoute } from "@react-navigation/native"
import { responsiveHeight, responsiveWidth } from '../components/Responsive';

const Comment = ({navigation}) => {
  const [comment, setComment] = useState('')
  const BASE_URL = 'https://serenemind-gateway.ulya.my.id'
  const route = useRoute()
  const id = route.params?.id
  const description = route.params?.description
  const user = route.params?.user

  const fetchComment = async() =>{
    try {
      const res = await axios.get(`${BASE_URL}/all-posts`);
      console.log(res.data.response + `${id}`);
      setComment(res.data.response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
        fetchComment();

      });
    return unSubscribe;

  },[navigation])


  return (
    <View style={{flex: 1}}>
      <Header title="Komen" btnRight="disabled" />
       <View>
              <View style={{flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 25, marginTop: 25, borderTopLeftRadius: 15, borderTopRightRadius:15}}>
                <Image
                      style={styles.image}
                      source={require('../images/user.png')}
                />
                <View style={{flexDirection: 'column', flex: 1, padding: 10, marginTop:10}}>
                  <Text style={{color: 'grey', fontWeight: 'bold'}}>{user}</Text>
                  <Text style={{color: 'grey'}}>{description}</Text>
                </View>
                <TouchableOpacity>
                  <Image style={{width: responsiveWidth(30), height: responsiveHeight(30), marginTop: 10}} source={require('../images/more.png')} />
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
    </View>
  )
}

const styles = StyleSheet.create({
  image:{
    marginLeft: 25,
    marginTop: 25,
    marginBottom: 25,
    width: 40,
    height: 40,
  }
});

export default Comment