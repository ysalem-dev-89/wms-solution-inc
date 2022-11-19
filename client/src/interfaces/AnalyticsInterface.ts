export interface ITotalStatistics {
  totalpurchases: number;
  totalsales: number;
  totalrevenues: number;
}

export interface IStockAlert {
  productid: number;
  product: string;
  instock: number;
  price: number;
  discount: number;
}
