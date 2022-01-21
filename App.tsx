import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { ToastProvider } from 'react-native-paper-toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PurchaseProvider } from './contexts/PurchaseContext';
import { Main } from './Main';

import 'react-native-get-random-values';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
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
