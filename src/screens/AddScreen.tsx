import {View} from 'react-native';
import React, {useCallback} from 'react';
import {Header} from '../components/Header/Header';

export default function AddScreen() {
  const onPressBack = useCallback(() => {}, []);

  return (
    <View>
      <Header>
        <Header.Title title="Add" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
    </View>
  );
}
