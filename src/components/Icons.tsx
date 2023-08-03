import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

export type IconName = string;

export function Icon({
  iconName,
  size,
  color,
}: {
  iconName: IconName;
  size: number;
  color: string;
}) {
  return <Ionicons name={iconName} size={size} color={color} />;
}
