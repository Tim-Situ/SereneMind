import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const location = 'Timeline';

const Timeline = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F7'}}>
      <Header title="Timeline" btnLeft="enabled" btnRight="disabled" />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Coming soon</Text>
      </View>
      <BottomNav screenName={location} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Timeline;
