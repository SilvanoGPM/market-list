import React from 'react';
import DropDown from 'react-native-paper-dropdown';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Constants from 'expo-constants';

import { useColor } from '../../contexts/ColorsContext';
import { useBoolean } from '../../hooks/useBoolean';

import styles from './styles';
import { VerifyUpdates } from './VerifyUpdates';

import defaultColors from '../../config/colors';

interface DrowdownItem {
  label: string;
  value: keyof typeof defaultColors;
}

const dropdownList: DrowdownItem[] = [
  { label: 'Roxo e Azul', value: 'purple-blue' },
  { label: 'Laranja e Azul', value: 'orange-blue' },
  { label: 'Vermelho e Rosa', value: 'red-pink' },
  { label: 'Verde e Amarelo', value: 'green-yellow' },
];

const version = Constants.manifest?.version;

export function Settings(): JSX.Element {
  const { colors } = useTheme();

  const { color, setColor } = useColor();

  const [showThemes, openThemes, closeThemes] = useBoolean(false);

  function switchTheme(value: keyof typeof defaultColors): void {
    const newColor = defaultColors[value];
    setColor({ name: value, ...newColor });
  }

  return (
    <View style={{ flex: 1 }}>
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

      <VerifyUpdates />

      <View style={styles.version}>
        <Text style={[{ color: colors.primary }, styles.versionText]}>
          Versão atual:{' '}
          <Text style={{ fontWeight: 'bold', color: colors.primary }}>
            {version}
          </Text>
        </Text>
      </View>
    </View>
  );
}
