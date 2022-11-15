import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { UserInterface } from '../../interfaces/UserInterface';
import * as User from '../../api/user';
import { UserData } from '../../interfaces/FormData';
import ErrorHandler from '../../helpers/ErrorHandler';
import { Role } from '../../interfaces/Enums';
import { newUserSchema, editUserSchema } from '../../validations/validation';

export default function UserModal(props: {
  user: UserInterface | null;
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
  } = useForm<UserData>({
    mode: 'onTouched',
    resolver: yupResolver(props.user ? editUserSchema : newUserSchema)
  });

  const toggle = () => props.setModal(!props.modal);

  const onSubmit = async (data: UserData) => {
    try {
      toggle();

      let result = null;
      let message = '';
      if (props.user) {
        console.log(data);
        result = await User.udpateOneUser({
          id: Number(props.user?.id),
          username: data.username,
          email: data.email,
          password: data.password || undefined,
          role: data.role
        });
        message = 'User is updated successfully';
      } else {
        result = await User.createNewUser({
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role
        });
        message = 'User is added successfully';
      }
      if (result && result.data.message == 'Success') {
        props.setIsSucceed(true);
        toast.success(message, {
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
    } catch (error: unknown) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
    }
  };

  const handleClose = () => {
    setValue('username', '');
    setValue('password', '');
    setValue('email', '');
    setValue('role', Role.admin);
    reset();
  };

  useEffect(() => {
    if (props.user) {
      setValue('username', props.user.username);
      setValue('email', props.user.email);
      setValue('role', props.user.role);
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
  }, [props.user, error]);

  return (
    <div>
      <Modal isOpen={props.modal} toggle={toggle} onClosed={handleClose}>
        <ModalHeader toggle={toggle}>
          {props.user ? 'Edit' : 'Add'} User
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <div className="form-input">
              <label htmlFor="username">Username: </label>
              <input
                {...register('username')}
                id="username"
                placeholder="Enter username"
                className="mb-4 form-control"
                defaultValue={props.user?.username}
              />
              <span className="text-danger input-error">
                {errors.username?.message}
              </span>
            </div>
            <div className="form-input">
              <label htmlFor="password">Password: </label>
              <input
                {...register('password')}
                id="password"
                type="password"
                placeholder="Enter password"
                className="mb-4 form-control"
              />
              <span className="text-danger input-error">
                {errors.password?.message}
              </span>
            </div>
            <div className="form-input">
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <input
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="mb-4 form-control"
              />
              <span className="text-danger input-error">
                {errors.confirmPassword?.message}
              </span>
            </div>
            <div className="form-input">
              <label htmlFor="email">Email: </label>
              <input
                {...register('email', {
                  required: true
                })}
                id="email"
                placeholder="Enter your email email"
                className="mb-4 form-control"
                defaultValue={props.user?.email}
              />
              <span className="text-danger input-error">
                {errors.email?.message}
              </span>
            </div>
            <div className="form-input">
              <label htmlFor="role">Role: </label>
              <select
                {...register('role')}
                id="role"
                placeholder="Enter role"
                className="mb-4 form-control"
                defaultValue={props.user?.role || Role.admin}
              >
                {Object.values(Role).map(role => (
                  <option key="role" value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <span className="text-danger input-error">
                {errors.role?.message}
              </span>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">{props.user ? 'Edit' : 'Add'}</Button>{' '}
            <Button color="danger" className="text-white" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
