import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import { Purchase } from '../@types/general.types';
import { useStorage } from '../hooks/useStorage';

type PurchaseToAdd = Omit<Purchase, 'id'>;

interface PurchaseContextProps {
  purchases: Purchase[];
  setPurchases: React.Dispatch<React.SetStateAction<Purchase[]>>;
  addPurchase: (purchase: PurchaseToAdd) => void;
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
  const [purchases, setPurchases, loading] = useStorage<Purchase[]>(
    PURCHASES_KEY,
    []
  );

  const addPurchase = useCallback(
    (purchase: PurchaseToAdd): void => {
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
