import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-get-random-values';

import { Main } from './Main';
import { ColorProvider } from './contexts/ColorsContext';
import { useUpdate } from './hooks/useUpdate';

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
  useUpdate();

  return (
    <SafeAreaProvider>
      <ColorProvider>
        <Main />
      </ColorProvider>
    </SafeAreaProvider>
  );
}
