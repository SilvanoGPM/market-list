import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { DefaultGradient } from '../DefaultGradient';

import styles from './styles';

export function StatusBarGradient(): JSX.Element {
  return (
    <>
      <StatusBar style="light" />
      <DefaultGradient style={styles.statusBarGradient} />
    </>
  );
}
