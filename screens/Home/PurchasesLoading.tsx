import React from 'react';
import { ImageBackground, View } from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Headline,
  useTheme,
} from 'react-native-paper';
import styles from './styles';

export function PurchasesLoading(): JSX.Element {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Avatar.Image
        size={100}
        style={[{ backgroundColor: colors.background }, styles.imageLoading]}
        source={require('../../assets/icon.png')}
      />

      <Headline style={{ marginBottom: 96 }}>Carregando compras...</Headline>

      <ActivityIndicator size={40} />

      <ImageBackground
        style={{ width: '100%', height: 300, alignItems: 'center' }}
        resizeMode="cover"
        source={require('../../assets/wave.png')}
      />
    </View>
  );
}
