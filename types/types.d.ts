interface Product {
  name: string;
  quantity: number;
  price: number;
  caught: boolean;
}

interface Purchase {
  id: string;
  title: string;
  total: number;
  products: Product[];
}

interface Color {
  name: string;
  gradient: string[];
  primary: string;
  icon: string;
}
