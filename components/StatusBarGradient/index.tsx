import { StatusBar } from 'expo-status-bar';

import { DefaultGradient } from '../DefaultGradient';

import styles from './styles';

export function StatusBarGradient() {
  return (
    <>
      <StatusBar style="light" />
      <DefaultGradient style={styles.statusBarGradient} />
    </>
  );
}
