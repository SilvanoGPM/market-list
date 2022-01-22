import React from 'react';
import { ImageBackground, View } from 'react-native';
import { ActivityIndicator, Headline, useTheme } from 'react-native-paper';

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
      <Headline style={[{ color: colors.primary }, styles.loadingTitle]}>
        Market List
      </Headline>

      <ActivityIndicator size={40} />

      <ImageBackground
        style={{ width: '100%', height: 300, alignItems: 'center' }}
        resizeMode="cover"
        source={require('../../assets/wave.png')}
      />
    </View>
  );
}
