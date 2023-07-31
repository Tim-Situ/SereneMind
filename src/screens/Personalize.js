import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {SimpleGrid} from 'react-native-super-grid';
import {StackActions, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';

const Personalize = ({route}) => {
  const navigation = useNavigation();
  const {userToken, userProfile} = useContext(AuthContext);
  const {mode} = route.params;
  const [items, setItems] = useState([
    {uri: require('../images/cemas.png')},
    {uri: require('../images/depresi.png')},
    {uri: require('../images/stress.png')},
    {uri: require('../images/kehilangan.png')},
    {uri: require('../images/sendiri.png')},
    {uri: require('../images/hubungan.png')},
    {uri: require('../images/trauma.png')},
    {uri: require('../images/masalah.png')},
    {uri: require('../images/tidur.png')},
  ]);
  const [selected, setSelected] = useState(-1);

  const newMessage = () => {
    axios
      .post(
        `${BASE_URL}/chat`,
        {
          category_id: selected,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      )
      .then(res => {
        navigation.dispatch(
          StackActions.replace('Chat', {
            id: res.data.data.id,
            mode: mode,
          }),
        );
        // navigation.navigate('Chat', {
        //   id: res.data.data.id,
        //   mode: mode,
        // });
      })
      .catch(err => {
        // handle error
        console.log(err);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7', padding: 20}}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: '#7286D3',
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          Personalisasi
        </Text>
        <Text
          style={{
            color: '#313131',
            fontSize: 16,
            marginBottom: 25,
            textAlign: 'center',
          }}>
          Hai {userProfile.name} , yuk beritahu aku apa masalah yang kamu alami!
          Seren siap membantumu.
        </Text>
      </View>
      <View style={{flex: 1}}>
        <ScrollView>
          <SimpleGrid
            itemDimension={150}
            data={items}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[styles.defaultCard, {height: 120}]}
                onPress={() => setSelected(3)}>
                <ImageBackground
                  source={item.uri}
                  resizeMode="cover"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 6,
                  }}></ImageBackground>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {selected != -1 ? (
          <TouchableOpacity
            style={{
              backgroundColor: '#7286D3',
              width: '100%',
              height: 50,
              borderRadius: 10,
              elevation: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => newMessage()}>
            <Text style={{color: '#FFFFFF'}}>Mulai Percakapan</Text>
          </TouchableOpacity>
        ) : (
          <Text>Pilih salahsatu kategori.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    elevation: 2,
  },
});

export default Personalize;
