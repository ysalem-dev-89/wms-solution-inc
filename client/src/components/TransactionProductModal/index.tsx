import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label
} from 'reactstrap';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { TransactionProductData } from '../../interfaces/FormData';
import ErrorHandler from '../../helpers/ErrorHandler';
import { TransactionProductInterface } from '../../interfaces/TransactionProductInterface';
import { updateTransactionProducts } from '../../helpers/transactionProducts';
import { TransactionStatus, TransactionType } from '../../interfaces/Enums';
import { transactionProductSchema } from '../../validations/validation';

export default function TransactionProductModal(props: {
  transactionProduct: TransactionProductInterface | null;
  setTransactionProduct: React.Dispatch<
    React.SetStateAction<TransactionProductInterface | null>
  >;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentTransactionProduct: TransactionProductInterface[];
  setCurrentTransactionProducts: React.Dispatch<
    React.SetStateAction<TransactionProductInterface[]>
  >;
  transactionType: TransactionType;
  operation: string;
}) {
  const [error, setError] = useState('');
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<TransactionProductData>({
    mode: 'onTouched',
    resolver: yupResolver(transactionProductSchema)
  });

  const toggle = () => props.setModal(!props.modal);

  const onSubmit = async (data: TransactionProductData) => {
    try {
      if (props.transactionProduct) {
        props.setCurrentTransactionProducts(
          updateTransactionProducts({
            currentTransactionProducts: props.currentTransactionProduct,
            quantity: Number(data.quantity),
            price: Number(data.price),
            type: props.transactionType,
            ProductId: props.transactionProduct?.Product.id || -1,
            status: data.status,
            Product: props.transactionProduct.Product
          })
        );
        toggle();
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

  const handleClose = () => {
    reset({
      price: props.transactionProduct?.unitPrice,
      discount: props.transactionProduct?.Product.discount,
      quantity: props.transactionProduct?.quantity,
      status: props.transactionProduct?.status
    });
  };

  useEffect(() => {
    if (props.transactionProduct) {
      setValue('price', props.transactionProduct.unitPrice);
      setValue('discount', props.transactionProduct.Product.discount);
      setValue('quantity', props.transactionProduct.quantity);
      setValue('status', props.transactionProduct.status);
    }

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
  }, [props.transactionProduct, error]);

  return (
    <div>
      <Modal isOpen={props.modal} toggle={toggle} onClosed={handleClose}>
        <ModalHeader toggle={toggle}>
          {props.transactionProduct?.Product?.title || 'Product'}
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormGroup>
              <Label for="price">Price</Label>
              <input
                {...register('price')}
                placeholder="Price"
                className="mb-4 form-control"
                name="price"
                defaultValue={props.transactionProduct?.unitPrice}
              />
              <span className="text-danger">{errors.price?.message}</span>
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Quantity</Label>
              <input
                {...register('quantity')}
                placeholder="Quantity"
                className="mb-4 form-control"
                name="quantity"
                defaultValue={props.transactionProduct?.quantity}
              />
              <span className="text-danger">{errors.quantity?.message}</span>
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
              <select
                {...register('status')}
                placeholder="status"
                className="mb-4 form-control"
                name="status"
                defaultValue={props.transactionProduct?.status}
              >
                {Object.values(TransactionStatus).map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <span className="text-danger">{errors.status?.message}</span>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">
              {props.transactionProduct ? 'Edit' : 'Add'}
            </Button>{' '}
            <Button color="danger" className="text-white" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
