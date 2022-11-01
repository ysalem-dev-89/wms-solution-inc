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
