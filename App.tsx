import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

import { Home } from './screens/Home';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="light" />

      <SafeAreaView style={{ flex: 1 }}>
        <Home />
      </SafeAreaView>
    </PaperProvider>
  );
}
