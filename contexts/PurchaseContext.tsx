import { createContext, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

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

export function PurchaseProvider({ children }: PurchaseProviderProps) {
  const [purchases, setPurchases] = useState<Purchase[]>([
    { id: '1', title: 'Compra N° 100', total: 34, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
    { id: '2', title: 'Compra N° 2', total: 25, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
    { id: '3', title: 'Compra N° 3', total: 50, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
    { id: '4', title: 'Compra N° 4000', total: 49, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
    { id: '5', title: 'Compra N° 3000', total: 49, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
    { id: '6', title: 'Compra N° 5000', total: 49, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
    { id: '7', title: 'Compra N° 6000', total: 49, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
  ]);

  function addPurchase(purchase: Purchase) {
    setPurchases([{ ...purchase, id: uuid() }, ...purchases]);
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
