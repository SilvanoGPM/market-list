import { sum } from './sum';

export function sumProducts(products: Product[] = []) {
  return sum(products, ({ price, quantity }) => (price || 0) * quantity);
}
