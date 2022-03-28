import { useEffect } from 'react';
import * as Updates from 'expo-updates';

export function useUpdate(): void {
  useEffect(() => {
    async function updateApp(): Promise<void> {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();

        if (isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch {
        console.error('Erro ao tentar atualizar aplicativo.');
      }
    }

    if (!__DEV__) {
      updateApp();
    }
  }, []);
}
