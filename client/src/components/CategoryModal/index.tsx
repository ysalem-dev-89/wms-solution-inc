import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import CategoryInterface from '../../interfaces/CategoryInterface';
import * as Category from '../../api/category';
import { CategoryData } from '../../interfaces/FormData';
import ErrorHandler from '../../helpers/ErrorHandler';

export default function CategoryModal(props: {
  category: CategoryInterface | null;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  isSucceed: boolean;
  setIsSucceed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [error, setError] = useState('');
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CategoryData>();

  const toggle = () => props.setModal(!props.modal);

  const onSubmit = async (data: CategoryData) => {
    try {
      toggle();

      let result = null;
      if (props.category) {
        result = await Category.update({
          id: Number(props.category?.id),
          name: data.category
        });
      } else {
        result = await Category.create(data.category);
      }
      if (result && result.data.message == 'Success') {
        props.setIsSucceed(true);
      }
    } catch (error: unknown) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
    }
  };

  const handleClose = () => {
    setValue('category', '');
    reset();
  };

  useEffect(() => {
    if (props.category) {
      setValue('category', props.category.name);
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
  }, [props.category, error]);

  return (
    <div>
      <Modal isOpen={props.modal} toggle={toggle} onClosed={handleClose}>
        <ModalHeader toggle={toggle}>
          {props.category ? 'Edit' : 'Add'} Category
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <input
              {...register('category', { required: 'Please fill in category' })}
              placeholder="Enter category name"
              className="mb-4 form-control"
              defaultValue={props.category?.name}
            />
            <span className="text-danger">{errors.category?.message}</span>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">{props.category ? 'Edit' : 'Add'}</Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
