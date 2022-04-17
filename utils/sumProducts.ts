import { sum } from './sum';
import { Product } from '../@types/general.types';

export function sumProducts(products: Product[] = []): number {
  return sum(products, ({ price, quantity }) => (price || 0) * quantity);
}
