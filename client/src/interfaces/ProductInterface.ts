export interface ProductInterface {
  id?: number;
  title: string;
  price: number;
  icon: string;
  discount: number;
  inStock?: number;
  createdAt: number;
  categoryId: number;
  actions: {
    open: void;
    edit: void;
    delete: void;
  };
}
