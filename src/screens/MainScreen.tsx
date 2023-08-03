import {Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {getAddressFromCoords, getCoordsFromAddress} from '../utils/GeoUtils';
import SingleLineInput from '../components/SingleLineInput';

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
  const [query, setQuery] = useState<string>('');

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

  const onFindAddress = useCallback<() => Promise<void>>(async () => {
    const addressResult = await getCoordsFromAddress(query);

    if (!addressResult) {
      console.error('주소값을 찾지 못했습니다.');
    }

    setCurrentAddress(addressResult!.address);
    setCurrentRegion({
      latitude: parseFloat(addressResult!.latitude.toString()),
      longitude: parseFloat(addressResult!.longitude.toString()),
    });
  }, [query]);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  return (
    <View style={{flex: 1}}>
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
            latitude: parseFloat(currentRegion.latitude.toString()),
            longitude: parseFloat(currentRegion.longitude.toString()),
          }}
        />
      </MapView>
      <View style={{position: 'absolute', top: 24, left: 24, right: 24}}>
        <View style={{backgroundColor: 'white'}}>
          <SingleLineInput
            value={query}
            placeholder="주소를 입력해주세요."
            onChangeText={setQuery}
            onSubmitEditing={onFindAddress}
          />
        </View>
      </View>
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
