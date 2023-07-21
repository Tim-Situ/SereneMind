import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const BottomNav = props => {
  const [activeMenu, setActiveMenu] = useState(props.screenName);
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.bottomNavMenu}
        onPress={() => navigation.navigate('Home')}>
        <Icon
          name="home-variant"
          size={25}
          color={activeMenu == 'Home' ? '#6a8dff' : '#bdbdbd'}
        />
        <Text style={styles.bottomNavText}>Beranda</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomNavMenu}
        onPress={() => navigation.navigate('Timeline')}>
        <Icon
          name="forum"
          size={25}
          color={activeMenu == 'Timeline' ? '#6a8dff' : '#bdbdbd'}
        />
        <Text style={styles.bottomNavText}>Timeline</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomNavMenu}
        onPress={() => navigation.navigate('Profile')}>
        <Icon
          name="account"
          size={25}
          color={activeMenu == 'Profile' ? '#6a8dff' : '#bdbdbd'}
        />
        <Text style={styles.bottomNavText}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    paddingVertical: 10,
    backgroundColor: '#fbfdff',
    flexDirection: 'row',
    elevation: 2,
  },
  bottomNavMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNavText: {
    fontSize: 12,
  },
});

export default BottomNav;
