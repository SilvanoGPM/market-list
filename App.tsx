import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ToastProvider } from 'react-native-paper-toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PurchaseProvider } from './contexts/PurchaseContext';
import { Main } from './Main';

import 'react-native-get-random-values';
import { Theme } from 'react-native-paper/lib/typescript/types';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      success: string;
      info: string;
    }
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    success: '#4cd137',
    info: '#487eb0',
    error: '#e84118',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <ToastProvider>
          <PurchaseProvider>
            <NavigationContainer>
              <Main />
            </NavigationContainer>
          </PurchaseProvider>
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
