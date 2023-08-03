import {Pressable, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  getAddressFromCoords,
  getCoordsByKeyword,
  getCoordsFromAddress,
} from '../utils/GeoUtils';
import SingleLineInput from '../components/SingleLineInput';
import {useRootNavigation} from '../navigation/RootNavigation';
import {getRestrauntList} from '../utils/RealTimeDatabaseUtils';

export default function MainScreen() {
  const navigation = useRootNavigation<'Main'>();
  const [currentRegion, setCurrentRegion] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.21377,
    longitude: 127.038024,
  });
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const [markerList, setMarkerList] = useState<
    {latitude: number; longitude: number; title: string; address: string}[]
  >([]);

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
    const keywordResult = await getCoordsByKeyword(query);

    if (keywordResult) {
      setCurrentAddress(keywordResult!.address);
      setCurrentRegion({
        latitude: parseFloat(keywordResult!.latitude.toString()),
        longitude: parseFloat(keywordResult!.longitude.toString()),
      });
      setQuery('');
      return;
    }

    const addressResult = await getCoordsFromAddress(query);

    if (!addressResult) {
      console.error('주소값을 찾지 못했습니다.');
    }

    setCurrentAddress(addressResult!.address);
    setCurrentRegion({
      latitude: parseFloat(addressResult!.latitude.toString()),
      longitude: parseFloat(addressResult!.longitude.toString()),
    });
    setQuery('');
  }, [query]);

  const onPressBottomAddress = useCallback(() => {
    if (!currentAddress) {
      return;
    }

    navigation.push('Add', {
      latitude: currentRegion.latitude,
      longitude: currentRegion.longitude,
      address: currentAddress,
    });
  }, [
    currentAddress,
    currentRegion.latitude,
    currentRegion.longitude,
    navigation,
  ]);

  const onMapReady = useCallback(async () => {
    setIsMapReady(true);
    const restrauntList = await getRestrauntList();

    if (restrauntList) {
      setMarkerList(restrauntList);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  useEffect(() => {
    // setInterval(() => {
    //   onMapReady();
    // }, 10000);
  }, [onMapReady]);

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
        onMapReady={onMapReady}
        onLongPress={event => {
          onChangeLocation(event.nativeEvent.coordinate);
        }}>
        {isMapReady && (
          <Marker
            coordinate={{
              latitude: parseFloat(currentRegion.latitude.toString()),
              longitude: parseFloat(currentRegion.longitude.toString()),
            }}
            pinColor="red"
          />
        )}
        {isMapReady &&
          markerList.map(item => {
            return (
              <Marker
                key={item.address}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={item.title}
                description={item.address}
                pinColor="blue"
                onCalloutPress={() => {
                  navigation.push('Detail', {
                    latitude: item.latitude,
                    longitude: item.longitude,
                    address: item.address,
                    title: item.title,
                  });
                }}
              />
            );
          })}
      </MapView>
      <View style={{position: 'absolute', top: 24, left: 24, right: 24}}>
        <View style={{backgroundColor: 'white'}}>
          <SingleLineInput
            value={query}
            placeholder="검색 할 내용을 입력해주세요."
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
          <Pressable
            onPress={onPressBottomAddress}
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 30,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>{currentAddress}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
