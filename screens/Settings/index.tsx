import React from 'react';
import DropDown from 'react-native-paper-dropdown';
import { View } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

import { useColor } from '../../contexts/ColorsContext';
import { useBoolean } from '../../hooks/useBoolean';

import styles from './styles';

const colors: Record<string, Omit<Color, 'name'>> = {
  'purple-blue': {
    primary: DefaultTheme.colors.primary,
    gradient: [DefaultTheme.colors.accent, DefaultTheme.colors.primary],
    icon: '#ffffff',
  },

  'orange-blue': {
    primary: '#e67e22',
    gradient: ['#1abc9c', '#e67e22'],
    icon: '#ffffff',
  },

  'red-pink': {
    primary: '#d63031',
    gradient: ['#d63031', '#fd79a8'],
    icon: '#ffffff',
  },

  'green-yellow': {
    primary: '#6ab04c',
    gradient: ['#6ab04c', '#f6e58d'],
    icon: '#ffffff',
  },
};

interface DrowdownItem {
  label: string;
  value: keyof typeof colors;
}

const dropdownList: DrowdownItem[] = [
  { label: 'Roxo e Azul', value: 'purple-blue' },
  { label: 'Laranja e Azul', value: 'orange-blue' },
  { label: 'Vermelho e Rosa', value: 'red-pink' },
  { label: 'Verde e Amarelo', value: 'green-yellow' },
];

export function Settings(): JSX.Element {
  const { color, setColor } = useColor();

  const [showThemes, openThemes, closeThemes] = useBoolean(false);

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
          showDropDown={openThemes}
          onDismiss={closeThemes}
          value={color.name}
          setValue={switchTheme}
          list={dropdownList}
        />
      </View>
    </View>
  );
}
