import React, { useState } from 'react';
import DropDown from 'react-native-paper-dropdown';
import { View } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

import styles from './styles';
import { useColor } from '../../contexts/ColorsContext';

const colors = {
  'purple-blue': {
    primary: DefaultTheme.colors.primary,
    gradient: [DefaultTheme.colors.accent, DefaultTheme.colors.primary],
  },

  'orange-blue': {
    primary: '#e67e22',
    gradient: ['#e67e22', '#1abc9c'],
  },
};

const dropdownList = [
  { label: 'Roxo e Azul', value: 'purple-blue' },
  { label: 'Laranja e Azul', value: 'orange-blue' },
];

export function Settings(): JSX.Element {
  const { color, setColor } = useColor();

  const [showThemes, setShowThemes] = useState(false);

  function switchTheme(value: keyof typeof colors): void {
    const newColor = colors[value];
    setColor({ name: value, ...newColor });
  }

  return (
    <View>
      <View style={styles.themes}>
        <DropDown
          label="Escolha um tema"
          mode="outlined"
          visible={showThemes}
          showDropDown={() => setShowThemes(true)}
          onDismiss={() => setShowThemes(false)}
          value={color.name}
          setValue={switchTheme}
          list={dropdownList}
        />
      </View>
    </View>
  );
}
