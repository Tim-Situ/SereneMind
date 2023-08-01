import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const Header = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
      {props.btnLeft == 'disabled' ? (
        <View></View>
      ) : (
        <TouchableOpacity
          style={styles.btnLeft}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color={'#6a8dff'} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{props.title}</Text>
      {props.btnRight == 'disabled' ? (
        <View></View>
      ) : (
        <TouchableOpacity style={styles.btnRight} onPress={props.btnRight}>
          <Icon name="bell" size={30} color={'#6a8dff'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    elevation: 2,
  },
  headerText: {
    flex: 1,
    color: '#7286D3',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnLeft: {
    marginRight: 5,
  },
  btnRight: {
    marginLeft: 5,
  },
});

export default Header;
