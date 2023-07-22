import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';

import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const location = 'Profile';

const Profile = () => {
  const navigation = useNavigation();
  const {logout, userProfile} = useContext(AuthContext);
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7'}}>
      <Header title="Profil" btnLeft="disabled" btnRight="disabled" />
      <View style={{alignItems: 'center', padding: 20}}>
        <Image
          style={{marginBottom: 20}}
          source={require('../images/profile.png')}
        />
        <Text style={{fontSize: 20, color: '#313131'}}>{userProfile.name}</Text>
        <Text style={{fontSize: 16, color: '#BDC3C7'}}>
          {userProfile.email}
        </Text>
      </View>
      <View style={{padding: 20, justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.listMenu}
          onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="account-edit" size={20} color={'#7286D3'} />
          <Text style={styles.listMenuText}>Edit Profil</Text>
          <Icon name="chevron-right" size={20} color={'#313131'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listMenu}
          onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog" size={20} color={'#7286D3'} />
          <Text style={styles.listMenuText}>Pengaturan Aplikasi</Text>
          <Icon name="chevron-right" size={20} color={'#313131'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listMenu}
          onPress={() => navigation.navigate('Help')}>
          <Icon name="help-circle" size={20} color={'#7286D3'} />
          <Text style={styles.listMenuText}>Bantuan</Text>
          <Icon name="chevron-right" size={20} color={'#313131'} />
        </TouchableOpacity>
        <Text>{}</Text>
        <TouchableOpacity style={styles.btnDanger} onPress={() => logout()}>
          <Text style={{color: '#FFFFFF'}}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}></View>
      <BottomNav screenName={location} />
    </View>
  );
};

const styles = StyleSheet.create({
  btnDanger: {
    backgroundColor: '#F22613',
    width: '100%',
    height: 50,
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  listMenu: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    marginBottom: 5,
  },
  listMenuText: {
    flex: 1,
    color: '#313131',
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default Profile;
