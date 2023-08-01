import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {SimpleGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import Date from '../components/Date';

import {BASE_URL} from '../config';

import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';

const History = () => {
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

  const deleteData = id => {
    axios
      .delete(`${BASE_URL}/chat/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        getData();
      })
      .catch(err => {
        // handle error
      });
  };

  const confirm = (id, title) => {
    Alert.alert(
      `Hapus Chat "${title}"`,
      'Dengan menghapus riwayat chat ini, seluruh isi pesan akan terhapus dan tidak bisa kembalikan.',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          onPress: () => deleteData(id),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7'}}>
      <Header title="Riwayat Obrolan" btnLeft="enabled" btnRight="disabled" />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView style={{padding: 20}}>
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
                ]}
                onPress={() =>
                  navigation.navigate('Chat', {id: item.id, mode: 'Text'})
                }>
                <View style={{flex: 1, padding: 15}}>
                  <Text style={styles.historyTitle}>{item.category.name}</Text>
                  <Date style={styles.historyDate} timestamp={item.createdAt} />
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                  }}
                  onPress={() => confirm(item.id, item.title)}>
                  <Icon
                    name="delete"
                    size={25}
                    color={'#ffffff'}
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
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
  historyTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  historyDate: {
    color: '#ffffff',
    fontSize: 12,
  },
});

export default History;
