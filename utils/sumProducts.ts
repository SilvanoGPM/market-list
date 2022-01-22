import { sum } from './sum';

export function sumProducts(products: Product[] = []): number {
  return sum(products, ({ price, quantity }) => (price || 0) * quantity);
}
