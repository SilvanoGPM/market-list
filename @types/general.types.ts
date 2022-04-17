export interface Product {
  name: string;
  quantity: number;
  price: number;
  caught: boolean;
}

export interface Purchase {
  id: string;
  title: string;
  total: number;
  products: Product[];
}

export interface Color {
  name: string;
  gradient: string[];
  primary: string;
  icon: string;
}
