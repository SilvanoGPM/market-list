import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { ToastProvider } from 'react-native-paper-toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Main } from './Main';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ToastProvider>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
