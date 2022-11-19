export const calculateTotalPrice = ({
  price,
  quantity,
  discount
}: {
  price: number;
  quantity: number;
  discount: number;
}) => {
  const total = price * quantity;
  return total - total * discount;
};

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
