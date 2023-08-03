import {View} from 'react-native';
import React from 'react';
import {Header} from '../components/Header/Header';

export default function MainScreen() {
  return (
    <View>
      <Header>
        <Header.Title title="Main" />
      </Header>
    </View>
  );
}
