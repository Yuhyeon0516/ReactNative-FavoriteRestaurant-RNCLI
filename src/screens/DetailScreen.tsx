import {View} from 'react-native';
import React, {useCallback} from 'react';
import {Header} from '../components/Header/Header';

export default function DetailScreen() {
  const onPressBack = useCallback(() => {}, []);

  return (
    <View>
      <Header>
        <Header.Title title="Detail" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
    </View>
  );
}
