import {View} from 'react-native';
import React from 'react';
import {Header} from '../components/Header/Header';
import MapView from 'react-native-maps';

// lat : 37.213770, long : 127.038024

export default function MainScreen() {
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Main" />
      </Header>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: 37.21377,
          longitude: 127.038024,
          latitudeDelta: 0.015,
          longitudeDelta: 0.021,
        }}
      />
    </View>
  );
}
