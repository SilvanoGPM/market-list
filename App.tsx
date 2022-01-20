import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

import { Home } from './screens/Home';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Home />
      </SafeAreaView>
    </PaperProvider>
  );
}
