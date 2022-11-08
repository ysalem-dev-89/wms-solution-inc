import { HiOutlineEye } from 'react-icons/hi';
import { TfiClose } from 'react-icons/tfi';
import { ProductInterface } from '../../interfaces/ProductInterface';
import './styles.css';

export const TableProductRow = ({
  product,
  startEditMode,
  deleteProduct
}: {
  product: ProductInterface;
  startEditMode: CallableFunction;
  deleteProduct: CallableFunction;
}) => {
  const date = new Date(
    product.createdAt || 'October 13, 2014 11:13:00' //TODO DELETE THE DUMMY DATE
  ).toLocaleString('en-US', {
    day: 'numeric',
    weekday: 'short',
    year: 'numeric',
    month: 'long'
  });
  const price = Number(product.price).toFixed(2);

  return (
    <tr>
      <td>{product.id}</td>
      <td>
        <img className="row-image" src={product.icon} alt="Brand image" />
      </td>
      <td>{product.title}</td>
      <td>{`$${price}`}</td>
      <td>{`%${(product.discount * 100).toFixed(2)}`}</td>
      <td>{product.inStock}</td>
      <td>{date}</td>
      <td>
        <div className="actions-td d-flex gap-2 align-items-center justify-content-center pe-4 actions-container">
          <button
            type="button"
            onClick={() => startEditMode(product.id?.toString())}
          >
            <HiOutlineEye className="text-blue" /> Edit
          </button>
          <button type="button" onClick={() => deleteProduct(product.id)}>
            <TfiClose className="text-danger" /> Remove
          </button>
        </div>
      </td>
    </tr>
  );
};
