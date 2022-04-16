import React from 'react';
import DropDown from 'react-native-paper-dropdown';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

import { useColor } from '../../contexts/ColorsContext';
import { useBoolean } from '../../hooks/useBoolean';

import styles from './styles';
import { VerifyUpdates } from './VerifyUpdates';

import defaultColors from '../../config/colors';

interface DrowdownItem {
  label: string;
  value: keyof typeof defaultColors;
  custom?: React.ReactNode;
}

const dropdownList: DrowdownItem[] = [
  { label: 'Roxo', value: 'purple' },
  { label: 'Laranja', value: 'orange' },
  { label: 'Vermelho', value: 'red' },
  { label: 'Verde', value: 'green' },
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

  function getDropdownlist(): DrowdownItem[] {
    return dropdownList.map(({ label, value }) => {
      const thisColor = defaultColors[value];

      const custom = (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <LinearGradient
            colors={thisColor.gradient}
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ backgroundColor: colors.primary, width: 30, height: 30 }}
          />

          <Text style={{ marginLeft: 10 }}>{label}</Text>
        </View>
      );

      return { label, value, custom };
    });
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
          list={getDropdownlist()}
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
