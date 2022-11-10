import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Spinner, Table } from 'reactstrap';
import {
  getAllProductsAPI,
  updateProductAPI,
  deleteProductAPI
} from '../../api/products';
import { DeleteModal } from '../../components/DeleteModal';
import { ModalEdit } from '../../components/ModalEdit';
import { TablePagination } from '../../components/TablePagination';
import { TableProductRow } from '../../components/TableProductRow';
import { ProductInterface } from '../../interfaces/ProductInterface';
import { ApiStatus, UserMessages } from '../../interfaces/Enums';
import './style.css';
import { FilterCanvas } from '../../components/FilterCanvas';

const fetchData = async (
  itemsPerPage: number,
  currentPage: number,
  setApiStatus: React.Dispatch<React.SetStateAction<ApiStatus>>,
  setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>,
  setFilteredProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>,
  setTotalItems: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    setProducts([]);
    const result = await getAllProductsAPI(
      itemsPerPage,
      (currentPage - 1) * itemsPerPage
    );
    if (result.status !== 200) throw new Error(UserMessages.FetchFailed);
    setApiStatus(ApiStatus.Success);
    const products = result.data.products;
    const totalCount = result.data.totalCount[0].count;
    setProducts(products);
    setFilteredProducts(products);
    setTotalItems(totalCount);
  } catch (error) {
    const exception = error as Error;
    toast.error(exception.message, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    setApiStatus(ApiStatus.Failed);
  }
};

const Products = () => {
  const [itemsPerPage] = useState<number>(20);
  const [apiStatus, setApiStatus] = useState(ApiStatus.Loading);
  const [toggleFilterCanvas, setToggleFilterCanvas] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(10000);
  const [minDiscountFilter, setMinDiscountFilter] = useState(0);
  const [maxDiscountFilter, setMaxDiscountFilter] = useState(100);
  const [products, setProducts] = useState([] as ProductInterface[]);
  const [filteredProducts, setFilteredProducts] = useState(
    [] as ProductInterface[]
  );
  const [{ editMode, productId }, setEditMode] = useState({
    editMode: false,
    productId: -1
  });
  // const [suggestionToggle, setSuggestionToggle] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [{ alertModal, deleteProductId }, setDeleteModal] = useState({
    alertModal: false,
    deleteProductId: -1
  });
  // const toggleSuggestion = () => setSuggestionToggle(prevState => !prevState);
  const startEditMode = (productId: number) => {
    setEditMode({ editMode: !editMode, productId });
  };

  const update = async (id: number, updatedProduct: ProductInterface) => {
    try {
      const result = await updateProductAPI(id, updatedProduct);
      if (result.status === 404) throw new Error('Product has not found.');
      const product = result.data;
      if (!product) throw new Error('Something went wrong !!!');
      startEditMode(-1);
      setUpdateTable(!updateTable);
    } catch (error) {
      const exception = error as Error;
      toast.error(exception.message, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const productSearch = () => {
    setFilteredProducts(
      products.filter(product => {
        if (searchQuery)
          return (
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            product.price >= minPriceFilter &&
            product.price <= maxPriceFilter &&
            product.discount >= minDiscountFilter / 100 &&
            product.discount <= maxDiscountFilter / 100
          );
        else
          return (
            product.price >= minPriceFilter &&
            product.price <= maxPriceFilter &&
            product.discount >= minDiscountFilter / 100 &&
            product.discount <= maxDiscountFilter / 100
          );
      })
    );
  };

  const deleteProduct = async () => {
    try {
      await deleteProductAPI(deleteProductId);
      setUpdateTable(!updateTable);
      setApiStatus(ApiStatus.Success);
    } catch (error) {
      const exception = error as Error;
      toast.error(exception.message, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      setApiStatus(ApiStatus.Failed);
    }
  };

  const toggleAlertModal = (id: number) => {
    setDeleteModal({ alertModal: !alertModal, deleteProductId: id });
  };

  const toggleCanvas = () => {
    setToggleFilterCanvas(!toggleFilterCanvas);
  };

  const setMinPrice = (minPrice: number) => {
    setMinPriceFilter(minPrice);
  };

  const setMaxPrice = (maxPrice: number) => {
    setMaxPriceFilter(maxPrice);
  };

  const setMinDiscount = (minDiscount: number) => {
    setMinDiscountFilter(minDiscount);
  };

  const setMaxDiscount = (maxDiscount: number) => {
    setMaxDiscountFilter(maxDiscount);
  };

  useEffect(() => {
    fetchData(
      itemsPerPage,
      currentPage,
      setApiStatus,
      setProducts,
      setFilteredProducts,
      setTotalItems
    );
  }, [updateTable, currentPage]);

  return (
    <div className="product-page-body">
      {apiStatus === ApiStatus.Loading ? (
        <div className="_load-products">
          <Spinner color="primary" type="grow">
            Loading...
          </Spinner>
        </div>
      ) : apiStatus === ApiStatus.Success ? (
        <div>
          <DeleteModal
            deleteProduct={deleteProduct}
            modal={alertModal}
            toggle={toggleAlertModal}
          />
          <ModalEdit
            product={
              filteredProducts.filter(
                (product: ProductInterface) => product.id == productId
              )[0]
            }
            modal={editMode}
            startEditMode={startEditMode}
            update={update}
          />
          <FilterCanvas
            filterOnChange={productSearch}
            show={toggleFilterCanvas}
            toggle={toggleCanvas}
            minDiscount={minDiscountFilter}
            maxDiscount={maxDiscountFilter}
            minPrice={minPriceFilter}
            maxPrice={maxPriceFilter}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            setMinDiscount={setMinDiscount}
            setMaxDiscount={setMaxDiscount}
          />
          <div className="_search-container">
            <div className="_search-box">
              <FaSearch className="_search-icon" />
              <input
                placeholder="Looking for something?"
                type="search"
                value={searchQuery}
                onChange={event => {
                  setSearchQuery(event.target.value);
                  productSearch();
                }}
              />
            </div>
            <Button
              className="_filter-btn"
              color="primary"
              onClick={toggleCanvas}
            >
              Filter
            </Button>
          </div>
          <div className="data-table">
            <Table responsive primary rounded>
              <thead>
                <tr className="head bg-blue text-white">
                  <th>#</th>
                  <th></th>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>DISCOUNT</th>
                  <th>IN STOCK</th>
                  <th>CREATED AT</th>
                  <th className="actions-th text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <TableProductRow
                    key={index}
                    product={product}
                    startEditMode={startEditMode}
                    deleteProduct={toggleAlertModal}
                  />
                ))}
              </tbody>
            </Table>
          </div>
          <TablePagination
            numOfPages={Math.ceil(totalItems / itemsPerPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <ToastContainer />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Products;
