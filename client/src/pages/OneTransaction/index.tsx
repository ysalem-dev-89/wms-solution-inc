import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
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
import { useParams, useNavigate } from 'react-router-dom';
import { GoSearch } from 'react-icons/go';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import moment from 'moment';
import axios, { AxiosError } from 'axios';
import TransactionInterface from '../../interfaces/TransactionInterface';
import './style.css';
import { TransactionProductInterface } from '../../interfaces/TransactionProductInterface';
import { TransactionProductsTable } from '../../components/TransactionProductsTable';
import * as Transaction from '../../api/transaction';
import ErrorHandler from '../../helpers/ErrorHandler';
import TransactionProductModal from '../../components/TransactionProductModal';
import { TransactionData } from '../../interfaces/FormData';
import * as Product from '../../api/product';
import { ProductInterface } from '../../interfaces/ProductInterface';
import * as TransactionProducts from '../../helpers/transactionProducts';
import { TransactionType } from '../../interfaces/Enums';
import { PageContext } from '../../contexts/PageContext';
import { calculateTotalPrice } from '../../helpers/NumberHelpers';
import useAuth from '../../hooks/useAuth';
import { UrgentContext } from '../../contexts/UrgentContext';
import { capitalizeFirstLetter } from '../../helpers/StringHelpers';

const OneTransaction = ({ operation }: { operation: string }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { urgent } = useContext(UrgentContext);
  console.log('Urgent in OneTransaction: ', urgent);

  const [transaction, setTransaction] = useState<TransactionInterface | null>(
    null
  );
  const [transactionProduct, setTransactionProduct] =
    useState<TransactionProductInterface | null>(null);

  const { register, watch, handleSubmit, setValue } =
    useForm<TransactionData>();
  const [transactionProducts, setTransactionProducts] = useState<
    TransactionProductInterface[]
  >([]);

  const transType = watch('type');

  const { setPages } = useContext(PageContext);

  const [products, setProducts] = useState<ProductInterface[]>([]);

  const [modal, setModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const { auth } = useAuth();
  const { user } = auth;

  const onSubmit = handleSubmit(async data => {
    try {
      let barcode = '';
      let title = '';
      if (data.search) {
        barcode = data.search
          .trim()
          .split('')
          .every(c => !Number.isNaN(+c) || c == ' ')
          ? data.search
          : '';
        title = barcode ? '' : data.search;
      }

      const list = await Product.getProducts({
        title: title,
        barcode: barcode,
        categoryId: ''
      });

      setProducts(list.data.products);
      setDropdownOpen(true);
    } catch (error: unknown) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
    }
  });

  // This function receives from urgent out of stock context
  useEffect(() => {
    if (urgent.length) {
      console.log(urgent);
      let newList: TransactionProductInterface[] = [];
      let result: TransactionProductInterface[] = [];
      urgent.forEach(u => {
        if (u.price != 0) {
          newList = TransactionProducts.addNewTransactionProduct({
            TransactionId: -1,
            currentTransactionProducts: result,
            price: u.price,
            quantity: 1000,
            ProductId: u.productid,
            Product: {
              id: u.productid,
              price: u.price,
              discount: u.discount,
              barcode: '',
              title: u.product,
              inStock: 1000
            }
          });
        }

        result = [...newList];
        setTransactionProducts(newList);
      });
    }
  }, [urgent]);

  const handleProductSelect = (
    ProductId: number,
    product: ProductInterface
  ) => {
    try {
      const transProduct = transactionProducts.find(
        item => item.ProductId == ProductId
      );

      if (
        (product?.inStock && product?.inStock > 10) ||
        transType == TransactionType.Purchase
      ) {
        let newList = [];
        if (transProduct) {
          newList = TransactionProducts.updateTransactionProducts({
            currentTransactionProducts: transactionProducts,
            price: product.price,
            quantity: transProduct?.quantity + 1,
            ProductId: ProductId
          });
        } else {
          newList = TransactionProducts.addNewTransactionProduct({
            TransactionId: transaction?.id || -1,
            currentTransactionProducts: transactionProducts,
            price: product.price,
            quantity: 1,
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
    setValue(
      'type',
      transaction?.type || urgent.length
        ? TransactionType.Purchase
        : TransactionType.Sale
    );
    if (operation == 'add') {
      setValue('createdAt', new Date());
    } else {
      setValue('createdAt', transaction?.createdAt || new Date());
    }

    setPages([
      { title: 'Dashboard', link: '' },
      { title: 'Transactions', link: 'transactions' },
      {
        title:
          operation == 'edit'
            ? transaction
              ? `${capitalizeFirstLetter(transaction?.type)} #${
                  transaction?.id
                }`
              : '#'
            : `New`,
        link:
          operation == 'edit'
            ? transaction
              ? `transactions/${transaction?.id}`
              : 'transactions'
            : 'transaction/add'
      },
      operation == 'edit'
        ? { title: 'Edit', link: 'edit' }
        : { title: '', link: '' }
    ]);
  }, [transaction]);

  const handleSave = async () => {
    try {
      if (!transactionProducts.length)
        throw new Error('You need to add products');

      if (operation == 'edit') {
        await Transaction.updateOneTransaction({
          id: transaction?.id || -1,
          type: transType || transaction?.type || TransactionType.Purchase,
          issuedBy: transaction?.User?.id || user?.id || 1,
          transactionProducts: transactionProducts
        });
      } else {
        const trans = await Transaction.createNewTransaction({
          type: transType,
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

      if (operation == 'edit') navigate(`/transactions/${transaction?.id}/`);
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

  useEffect(() => {
    if (operation == 'add' && transaction)
      navigate(`/transactions/${transaction?.id}/`);
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
    <section className="data-table-section bg-bg-light pt-2 transaction-details">
      <header>
        <div className="transaction-inputs d-flex justify-content-between mb-3 align-items-center">
          <form onSubmit={onSubmit}>
            <Row xs="1" sm="3">
              <Col>
                <FormGroup>
                  <Label for="type">Type: </Label>
                  <select
                    {...register('type')}
                    name="type"
                    id="type"
                    defaultValue={transaction?.type}
                    required={true}
                    className="form-control"
                  >
                    {Object.values(TransactionType).map(myType => (
                      <option value={myType} key={myType}>
                        {myType}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </Col>
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
                    value={moment().format('YYYY-MM-DDTHH:mm')}
                    disabled={true}
                  />
                </FormGroup>
              </Col>
            </Row>
          </form>
        </div>
      </header>
      <div className="mb-2">
        <div className="search-input">
          <form onSubmit={onSubmit}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <GoSearch onClick={onSubmit} role="button" />
              <input
                type="text"
                {...register('search')}
                name="search"
                className="p-2 border border-border outline-none rounded form-control"
                placeholder="Type your product and press Enter"
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
                        <span className="ps-4">
                          {' '}
                          <GoSearch />
                          <img src={product.icon} alt="product icon" />
                          {product.title}
                        </span>
                        <span>${product.price}</span>
                      </div>
                    </ListGroupItem>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </form>
        </div>
      </div>
      <TransactionProductsTable
        transactionProduct={transactionProduct}
        setTransactionProduct={setTransactionProduct}
        transactionId={Number(id)}
        modal={modal}
        setModal={setModal}
        operation={operation}
        transactionProducts={transactionProducts}
        setTransactionProducts={setTransactionProducts}
        forCashier={false}
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
          className="px-4 py-2 ms-auto"
          color="primary"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </Button>
        <Button
          className="px-4 py-2 text-white"
          color="danger"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </div>

      <TransactionProductModal
        transactionProduct={transactionProduct}
        setTransactionProduct={setTransactionProduct}
        modal={modal}
        setModal={setModal}
        currentTransactionProduct={transactionProducts || []}
        setCurrentTransactionProducts={setTransactionProducts}
      />
    </section>
  );
};

export default OneTransaction;
