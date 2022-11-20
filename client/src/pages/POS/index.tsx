import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  FormGroup,
  Label,
  ListGroup,
  ListGroupItem,
  Row
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import moment from 'moment';
import axios, { AxiosError } from 'axios';
import TransactionInterface from '../../interfaces/TransactionInterface';
import { BsFillCalculatorFill } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go';
import { FaMoneyBillWave } from 'react-icons/fa';
import { FaTh } from 'react-icons/fa';
import './style.css';
import { TransactionProductInterface } from '../../interfaces/TransactionProductInterface';
import { TransactionProductsTable } from '../../components/TransactionProductsTable';
import * as Transaction from '../../api/transaction';
import * as Category from '../../api/category';
import ErrorHandler from '../../helpers/ErrorHandler';
import TransactionProductModal from '../../components/TransactionProductModal';
import { TransactionData } from '../../interfaces/FormData';
import * as Product from '../../api/product';
import { ProductInterface } from '../../interfaces/ProductInterface';
import * as TransactionProducts from '../../helpers/transactionProducts';
import { TransactionType } from '../../interfaces/Enums';
import { calculateTotalPrice } from '../../helpers/NumberHelpers';
import useAuth from '../../hooks/useAuth';
import CategoryInterface from '../../interfaces/CategoryInterface';
import 'swiper/css';

const POS = ({ operation }: { operation: string }) => {
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState<TransactionInterface | null>(
    null
  );
  const [transactionProduct, setTransactionProduct] =
    useState<TransactionProductInterface | null>(null);

  const { register, handleSubmit, setValue } = useForm<TransactionData>();
  const [transactionProducts, setTransactionProducts] = useState<
    TransactionProductInterface[]
  >([]);

  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [productsMenu, setProductsMenu] = useState<ProductInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [category, setCategory] = useState<CategoryInterface | null>(null);

  const [modal, setModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const { auth } = useAuth();
  const { user } = auth;

  const { id } = useParams();

  const onSubmit = handleSubmit(async data => {
    try {
      if (data.search) {
        const barcode = data.search
          .trim()
          .split('')
          .every(c => !Number.isNaN(+c) || c == ' ')
          ? data.search
          : '';
        const title = barcode ? '' : data.search;

        const list = await Product.getProducts({
          title: title,
          barcode: barcode,
          categoryId: ''
        });

        setProducts(list.data.products);
        if (list.data.products.length > 1) setDropdownOpen(true);
      }
    } catch (error: unknown) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
    }
  });

  const handleSave = async () => {
    try {
      if (!transactionProducts.length)
        throw new Error('You need to add products');

      transactionProducts.forEach(transProduct => {
        if (transProduct.quantity > (transProduct.Product?.inStock || 0)) {
          throw new Error(
            `The quantity of "${transProduct.Product.title}" product exceeded the available in stock`
          );
        }
      });

      if (operation == 'edit') {
        await Transaction.updateOneTransaction({
          id: transaction?.id || -1,
          type: TransactionType.Sale,
          issuedBy: transaction?.User?.id || user?.id || 1,
          transactionProducts: transactionProducts
        });
      } else {
        const trans = await Transaction.createNewTransaction({
          type: TransactionType.Sale,
          issuedBy: user?.id || 1,
          transactionProducts: transactionProducts
        });
        if (trans) {
          setTransaction(trans.data?.transaction);
        }
      }

      toast.success(
        `Transaction is ${
          operation == 'edit' ? 'updated' : 'added'
        } successfully`,
        {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        }
      );
      if (operation == 'edit') navigate(`/pos/${transaction?.id}/`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const exception = error as AxiosError;
        ErrorHandler.handleRequestError(exception, setError);
      } else {
        const exception = error as Error;
        setError(exception.message);
      }
    }
  };

  const handleProductSelect = (
    ProductId: number,
    product: ProductInterface
  ) => {
    try {
      const transProduct = transactionProducts.find(
        item => item.ProductId == ProductId
      );

      if (product?.inStock && product?.inStock > 10) {
        let newList = [];
        if (transProduct) {
          newList = TransactionProducts.updateTransactionProducts({
            currentTransactionProducts: transactionProducts,
            price: product.price,
            type: TransactionType.Sale,
            quantity: transProduct?.quantity + 1,
            ProductId: ProductId,
            Product: product
          });
        } else {
          newList = TransactionProducts.addNewTransactionProduct({
            TransactionId: transaction?.id || -1,
            currentTransactionProducts: transactionProducts,
            price: product.price,
            quantity: 1,
            type: TransactionType.Sale,
            ProductId: ProductId,
            Product: product
          });
        }
        setTransactionProducts(newList);
        setDropdownOpen(false);
        setValue('search', '');
      } else {
        throw new Error('This product is out of stock');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const exception = error as AxiosError;
        ErrorHandler.handleRequestError(exception, setError);
      } else {
        const exception = error as Error;
        setError(exception.message);
      }
    }
  };

  const isAddedToCart = (
    id: number,
    transactionProductList: TransactionProductInterface[]
  ): boolean => {
    return transactionProductList.some(prodItem => prodItem.Product.id === id);
  };

  useEffect(() => {
    if (operation == 'edit') {
      const fetchData = async () => {
        try {
          const list = await Transaction.getOneTransaction({ id: Number(id) });
          setTransaction(list.data.transaction.transaction);
          setTransactionProducts(list.data?.transaction?.transactionProducts);
        } catch (error: unknown) {
          const exception = error as AxiosError;
          ErrorHandler.handleRequestError(exception, setError);
        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await Category.getCategories({
          name: '',
          limit: 50,
          offset: 0
        });
        setCategories(list.data?.items);
      } catch (error: unknown) {
        const exception = error as AxiosError;
        ErrorHandler.handleRequestError(exception, setError);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await Product.getProducts({
          title: '',
          barcode: '',
          categoryId: category ? `${category.id}` : ''
        });
        setProductsMenu(list.data?.products);
      } catch (error: unknown) {
        const exception = error as AxiosError;
        ErrorHandler.handleRequestError(exception, setError);
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    if (products.length == 1) {
      handleProductSelect(products[0].id || -1, products[0]);
    }
  }, [products]);

  useEffect(() => {
    if (operation == 'add' && transaction) navigate(`/pos/${transaction?.id}/`);
  }, [transaction]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      setError('');
    }
  }, [error]);

  return (
    <div className="pos-container d-flex gap-3">
      <section className="bg-bg-light pt-2 cart-products p-3 rounded">
        <header>
          <h1 className="h3 text-dark rounded border-bottom pb-1 mb-3">
            {operation == 'add' ? 'New Invoice' : `Invoice #${id}`}
          </h1>
          <div className="transaction-inputs d-flex justify-content-between mb-3 align-items-center">
            <form onSubmit={onSubmit}>
              <Row xs="1" sm="2">
                <Col>
                  <FormGroup>
                    <Label for="username">Username: </Label>
                    <input
                      {...register('username')}
                      type="text"
                      name="username"
                      id="username"
                      defaultValue={
                        operation == 'edit'
                          ? transaction?.User?.username
                          : user?.username
                      }
                      required={true}
                      className="form-control"
                      disabled={true}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="createdAt">Created Date: </Label>
                    <input
                      {...register('createdAt')}
                      type="datetime-local"
                      name="createdAt"
                      id="createdAt"
                      required={true}
                      className="form-control"
                      defaultValue={moment().format('YYYY-MM-DDTHH:mm')}
                      disabled={true}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </div>
        </header>
        <TransactionProductsTable
          transactionProduct={transactionProduct}
          setTransactionProduct={setTransactionProduct}
          transactionId={Number(1)}
          modal={modal}
          setModal={setModal}
          operation={operation}
          transactionProducts={transactionProducts}
          setTransactionProducts={setTransactionProducts}
          transactionType={TransactionType.Sale}
          forCashier={true}
        />
        <Card
          className="my-2 ms-auto"
          style={{
            width: '18rem'
          }}
        >
          <CardHeader>Total Cost</CardHeader>
          <CardBody>
            <CardText>
              <ListGroup>
                <ListGroupItem>
                  <Row className="d-flex justify-content-between">
                    <Col>Products Count</Col>
                    <Col>{transactionProducts?.length}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Unit Count</Col>
                    <Col>
                      {transactionProducts?.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Total Price:</Col>
                    <Col>
                      $
                      {transactionProducts
                        ?.reduce(
                          (acc, item) =>
                            acc +
                            calculateTotalPrice({
                              price: item?.unitPrice || 0,
                              quantity: item?.quantity || 1,
                              discount: item?.Product.discount || 0
                            }),
                          0
                        )
                        .toFixed(2)}
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </CardText>
          </CardBody>
        </Card>

        <div className="justify-content-between d-flex gap-2 py-3 mt-4 border-top border-border ">
          <Button
            className="px-5 py-2 ms-auto text-white"
            color="success"
            onClick={() => {
              handleSave();
            }}
          >
            {operation == 'add' ? 'Pay Now' : 'Update'}
            <FaMoneyBillWave className="ms-2" />
          </Button>
          <Button
            className="px-5 py-2  text-white"
            color="danger"
            onClick={() => {
              if (id) {
                setTransactionProducts([]);
                navigate('/pos/');
              } else setTransactionProducts([]);
            }}
          >
            {/* <GrPowerReset fill="#fff" stroke="#fff" className="text-white" />{' '} */}
            Reset
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              className="fs-4 ms-2"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              ></path>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"></path>
            </svg>
          </Button>
        </div>

        <TransactionProductModal
          transactionProduct={transactionProduct}
          setTransactionProduct={setTransactionProduct}
          modal={modal}
          setModal={setModal}
          currentTransactionProduct={transactionProducts || []}
          setCurrentTransactionProducts={setTransactionProducts}
          transactionType={TransactionType.Sale}
        />
      </section>
      <section className="pos-products bg-bg-light pt-2 transaction-details p-3 rounded">
        <div className="d-flex mb-3 gap-2">
          <div className="search-input">
            <form onSubmit={onSubmit}>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <GoSearch onClick={onSubmit} role="button" />
                <input
                  type="text"
                  {...register('search')}
                  name="search"
                  className="p-2 border border-border outline-none rounded form-control"
                  placeholder="Scan/Search Product by Barcode/Title"
                  onChange={e => {
                    setValue('search', e.target.value);
                    onSubmit(e);
                  }}
                />
                <DropdownMenu>
                  {products.slice(0, 100).map(product => (
                    <DropdownItem text key={product.id}>
                      <ListGroupItem
                        action
                        active
                        href="#"
                        tag="a"
                        onClick={() =>
                          handleProductSelect(Number(product.id) || 0, product)
                        }
                      >
                        <div className="product-item d-flex justify-content-between">
                          <div className="d-flex ps-4">
                            {' '}
                            <GoSearch />
                            <img src={product.icon} alt="product icon" />
                            <div className="d-flex flex-column">
                              <span>{product.title}</span>
                              <span>{product.barcode}</span>
                            </div>
                          </div>
                          <span>${product.price}</span>
                        </div>
                      </ListGroupItem>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </form>
          </div>
          <Button
            className="px-4 "
            color="primary"
            onClick={() => {
              navigate('.');
            }}
          >
            <BsFillCalculatorFill />
          </Button>
          <Button
            className="px-4"
            color="primary"
            onClick={() => {
              navigate('/');
            }}
          >
            <FaTh />
          </Button>
        </div>
        <div className="category-items d-flex gap-2">
          <Button onClick={() => setCategory(null)} active={!category}>
            All Categories
          </Button>
          <Swiper
            spaceBetween={7}
            slidesPerView={8}
            slidesOffsetAfter={500}
            scrollbar={{ draggable: true }}
          >
            {categories.map(categoryItem => (
              <SwiperSlide key={categoryItem.id}>
                <Button
                  onClick={() => setCategory(categoryItem)}
                  active={category?.id === categoryItem.id}
                >
                  {categoryItem.name}
                </Button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="product-items d-flex gap-2 mt-3">
          {productsMenu.map(productItem => (
            <Card
              key={productItem.id}
              className="p-3 rounded shadow-sm"
              style={
                isAddedToCart(productItem?.id || -1, transactionProducts)
                  ? {
                      borderColor: 'var(--primary)'
                    }
                  : {}
              }
              role="button"
              onClick={() =>
                handleProductSelect(productItem?.id || 0, productItem)
              }
            >
              <img alt="Card cap" src={productItem.icon} width="100%" />
              <CardBody>
                <CardTitle tag="h5">{productItem.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {productItem.barcode}
                </CardSubtitle>
                <div className="card-details">
                  <span className="price">${productItem.price}</span>
                  <span className="in-stock">
                    {productItem.inStock} {productItem.unit}
                  </span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default POS;
