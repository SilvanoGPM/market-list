import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView>
        <Button mode="contained">Press me</Button>
      </SafeAreaView>
    </PaperProvider>
  );
}
