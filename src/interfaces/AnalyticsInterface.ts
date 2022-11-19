export interface IMonthlyData {
  y: string;
  m: string;
  purchases: string;
  sales: string;
}

export interface IStockAlert {
  productid: number;
  product: string;
  instock: number;
}
