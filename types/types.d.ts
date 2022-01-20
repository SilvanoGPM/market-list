interface Product {
  name: string;
  quantity: number;
  price?: number;
}

interface Purchase {
  id: string;
  title: string;
  total: number;
  products: Product[];
}
