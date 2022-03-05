import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Main } from './Main';

import 'react-native-get-random-values';
import { ColorProvider } from './contexts/ColorsContext';

/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      success: string;
      info: string;
      icon: string;
      gradient: string[];
    }
  }
}

/* eslint-enable @typescript-eslint/no-namespace */

export default function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <ColorProvider>
        <Main />
      </ColorProvider>
    </SafeAreaProvider>
  );
}
