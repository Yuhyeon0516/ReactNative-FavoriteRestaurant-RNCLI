import {Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Header} from '../components/Header/Header';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {getAddressFromCoords} from '../utils/GeoUtils';

// lat : 37.213770, long : 127.038024

export default function MainScreen() {
  const [currentRegion, setCurrentRegion] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.21377,
    longitude: 127.038024,
  });
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);

  const onChangeLocation = useCallback<
    (item: {latitude: number; longitude: number}) => Promise<void>
  >(async item => {
    setCurrentRegion({
      latitude: item.latitude,
      longitude: item.longitude,
    });

    getAddressFromCoords(item.latitude, item.longitude).then(setCurrentAddress);
  }, []);

  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(postion => {
      onChangeLocation({
        latitude: postion.coords.latitude,
        longitude: postion.coords.longitude,
      });
    });
  }, [onChangeLocation]);

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
        }}
        onLongPress={event => {
          onChangeLocation(event.nativeEvent.coordinate);
        }}>
        <Marker
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          }}
        />
      </MapView>
      {currentAddress && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 30,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>{currentAddress}</Text>
          </View>
        </View>
      )}
    </View>
  );
}
