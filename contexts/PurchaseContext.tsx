import { createContext, useContext, useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { ActivityIndicator, Headline, useTheme } from 'react-native-paper';
import { v4 as uuid } from 'uuid';

import Repository from '../lib/Repository';

import styles from './styles';

interface PurchaseContextProps {
  purchases: Purchase[];
  setPurchases: React.Dispatch<React.SetStateAction<Purchase[]>>;
  addPurchase: (purchase: Purchase) => void;
}

export const PurchaseContext = createContext<PurchaseContextProps>(
  {} as PurchaseContextProps
);

interface PurchaseProviderProps {
  children: React.ReactNode;
}

const PURCHASES_KEY = '@SkyG0D/Purchases';

const repository = new Repository();

export function PurchaseProvider({ children }: PurchaseProviderProps) {
  const { colors } = useTheme();

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPurchases() {
      const purchases = await repository.get<Purchase[]>(PURCHASES_KEY);

      if (purchases) {
        setPurchases(purchases);
      }

      setLoading(false);
    }

    loadPurchases();
  }, []);

  useEffect(() => {
    async function savePurchases() {
      await repository.save(PURCHASES_KEY, purchases);
    }

    if (!loading) {
      savePurchases();
    }
  }, [purchases]);

  function addPurchase(purchase: Purchase) {
    setPurchases([{ ...purchase, id: uuid() }, ...purchases]);
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Headline
          style={[
            { color: colors.primary },
            styles.title,
          ]}
        >
          Market List
        </Headline>
        <ActivityIndicator size={40} />

        <ImageBackground
          style={{ width: '100%', height: 300, alignItems: 'center' }}
          resizeMode="cover"
          source={require('../assets/wave.png')}
        />
      </View>
    );
  }

  return (
    <PurchaseContext.Provider value={{ purchases, setPurchases, addPurchase }}>
      {children}
    </PurchaseContext.Provider>
  );
}

export function usePurchases() {
  return useContext(PurchaseContext);
}
