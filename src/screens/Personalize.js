import {View, Text, TouchableOpacity, Image, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import { FlatGrid } from 'react-native-super-grid';

const Personalize = ({route, navigation}) => {
  const {name} = route.params;
  const [items, setItems] = React.useState([
    {uri: require('../images/cemas.png')},
    {uri: require('../images/depresi.png')},
    {uri: require('../images/stress.png')},
    {uri: require('../images/kehilangan.png')},
    {uri: require('../images/sendiri.png')},
    {uri: require('../images/hubungan.png')},
    {uri: require('../images/trauma.png')},
    {uri: require('../images/masalah.png')},
    {uri: require('../images/tidur.png')},
    {uri: require('../images/motivasi.png')}, 
  ]);

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
          Hai {name} , yuk beritahu aku apa masalah yang kamu alami! Seren siap
          membantumu.
        </Text>
      </View>
      <View style={{flex: 1}}>
        <FlatGrid
          itemDimension={130}
          data={items}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              <Image source={item.uri}/>
            </ScrollView>
          )}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#7286D3',
            width: '100%',
            height: 50,
            borderRadius: 10,
            elevation: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }} onPress={() => navigation.navigate('SignUp',{name: name})}>
          <Text style={{color: '#FFFFFF'}}>Pilih</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

export default Personalize;
