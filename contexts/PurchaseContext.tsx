import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { v4 as uuid } from 'uuid';

import Repository from '../lib/Repository';

interface PurchaseContextProps {
  purchases: Purchase[];
  setPurchases: React.Dispatch<React.SetStateAction<Purchase[]>>;
  addPurchase: (purchase: Purchase) => void;
  purchasesLoading: boolean;
}

export const PurchaseContext = createContext<PurchaseContextProps>(
  {} as PurchaseContextProps
);

interface PurchaseProviderProps {
  children: React.ReactNode;
}

const PURCHASES_KEY = '@SkyG0D/Purchases';

export function PurchaseProvider({
  children,
}: PurchaseProviderProps): JSX.Element {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPurchases(): Promise<void> {
      const purchasesFound = await Repository.get<Purchase[]>(PURCHASES_KEY);

      if (purchasesFound) {
        setPurchases(purchasesFound);
      }

      setLoading(false);
    }

    loadPurchases();
  }, []);

  useEffect(() => {
    async function savePurchases(): Promise<void> {
      await Repository.save(PURCHASES_KEY, purchases);
    }

    if (!loading) {
      savePurchases();
    }
  }, [purchases, loading]);

  const addPurchase = useCallback(
    (purchase: Purchase): void => {
      setPurchases([{ ...purchase, id: uuid() }, ...purchases]);
    },
    [setPurchases, purchases]
  );

  const defaultValue = useMemo(
    () => ({ purchases, setPurchases, addPurchase, purchasesLoading: loading }),
    [purchases, setPurchases, addPurchase, loading]
  );

  return (
    <PurchaseContext.Provider value={defaultValue}>
      {children}
    </PurchaseContext.Provider>
  );
}

export function usePurchases(): PurchaseContextProps {
  return useContext(PurchaseContext);
}
