import {View} from 'react-native';
import React, {useCallback} from 'react';
import {Header} from '../components/Header/Header';
import {Typography} from '../components/Typography';
import {Spacer} from '../components/Spacer';
import MapView, {Marker} from 'react-native-maps';
import {CustomButton} from '../components/CustomButton';
import {useRootNavigation, useRootRoute} from '../navigation/RootNavigation';

export default function DetailScreen() {
  const routes = useRootRoute<'Detail'>();
  const navigation = useRootNavigation<'Detail'>();

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onPressKakaoShare = useCallback(() => {}, []);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Detail" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
      <View style={{flex: 1, paddingTop: 24, paddingHorizontal: 24}}>
        <Typography fontSize={16}>가게명</Typography>
        <Spacer space={8} />
        <Typography fontSize={20}>{routes.params.title}</Typography>
        <Spacer space={24} />

        <Typography fontSize={16}>주소</Typography>
        <Spacer space={8} />
        <Typography fontSize={20}>{routes.params.address}</Typography>

        <Spacer space={24} />

        <Typography fontSize={16}>위치</Typography>
        <MapView
          style={{height: 200}}
          region={{
            latitude: routes.params.latitude,
            longitude: routes.params.longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.003,
          }}>
          <Marker
            coordinate={{
              latitude: routes.params.latitude,
              longitude: routes.params.longitude,
            }}
          />
        </MapView>

        <Spacer space={48} />
        <CustomButton onPress={onPressKakaoShare}>
          <View
            style={{
              backgroundColor: 'yellow',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={20} color="black">
              카카오로 공유하기
            </Typography>
          </View>
        </CustomButton>
      </View>
    </View>
  );
}
