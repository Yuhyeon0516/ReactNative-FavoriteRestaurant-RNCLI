import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Header} from '../components/Header/Header';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

// lat : 37.213770, long : 127.038024

export default function MainScreen() {
  const [currentRegion, setCurrentRegion] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.21377,
    longitude: 127.038024,
  });
  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(postion => {
      setCurrentRegion({
        latitude: postion.coords.latitude,
        longitude: postion.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Main" />
      </Header>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.021,
        }}>
        <Marker
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          }}
        />
      </MapView>
    </View>
  );
}
