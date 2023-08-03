import {View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Header} from '../components/Header/Header';
import {Typography} from '../components/Typography';
import {Spacer} from '../components/Spacer';
import SingleLineInput from '../components/SingleLineInput';
import {useRootNavigation, useRootRoute} from '../navigation/RootNavigation';
import MapView, {Marker} from 'react-native-maps';
import {CustomButton} from '../components/CustomButton';
import {saveNewRestraunt} from '../utils/RealTimeDatabaseUtils';

export default function AddScreen() {
  const routes = useRootRoute<'Add'>();
  const navigation = useRootNavigation<'Add'>();
  const [title, setTitle] = useState('');
  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onPressSave = useCallback(async () => {
    if (!title) {
      return;
    }

    await saveNewRestraunt({
      title: title,
      address: routes.params.address,
      latitude: routes.params.latitude,
      longitude: routes.params.longitude,
    });

    navigation.goBack();
  }, [
    navigation,
    routes.params.address,
    routes.params.latitude,
    routes.params.longitude,
    title,
  ]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Add" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
      <View style={{flex: 1, paddingTop: 24, paddingHorizontal: 24}}>
        <Typography fontSize={16}>가게명</Typography>
        <Spacer space={8} />
        <SingleLineInput
          value={title}
          placeholder="가게명을 입력해주세요."
          onChangeText={setTitle}
        />

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
        <CustomButton onPress={onPressSave}>
          <View
            style={{
              backgroundColor: title ? 'black' : 'gray',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={20} color="white">
              저장하기
            </Typography>
          </View>
        </CustomButton>
      </View>
    </View>
  );
}
