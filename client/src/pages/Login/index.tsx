import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Navigate, redirect } from 'react-router-dom';
import { AxiosError } from 'axios';
import { authApi } from '../../api';
import { Credential } from '../../interfaces/CredentialInterface';
import useAuth from '../../hooks/useAuth';
import './styles.css';

function AuthPage() {
  const { auth, dispatch } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const [error, setError] = useState('');

  const signIn = async (data: Credential) => {
    try {
      const user = await authApi.signInApi(data);

      dispatch?.({
        type: 'LOGIN',
        payload: { user }
      });
      redirect('/');
    } catch (error: unknown) {
      const exception = error as AxiosError;
      if (exception.response) {
        if (exception.response.status === 400) {
          setError('Please double check your password and email.');
        } else {
          setError('Something went wrong, please try again later.');
        }
      } else if (exception.request) {
        setError('Something went wrong, please try again later.');
      } else {
        setError('Something went wrong, please try again later.');
      }
    }
  };

  return !auth?.loggedIn ? (
    <form
      className="form-container m-5"
      onSubmit={handleSubmit(data => {
        signIn(data);
      })}
    >
      <div className="input-container">
        <p className="input-label">User name:</p>
        <input
          className="user-name"
          {...register('username', {
            required: true
          })}
          placeholder="username"
        />
      </div>
      {errors.username && <p className="error">This field is required</p>}
      <div className="input-container">
        <p className="input-label">Password</p>
        <input
          {...register('password', {
            required: true
          })}
          placeholder="password"
          className="user-name"
          type="password"
        />
      </div>
      {errors.password && <p className="error">This field is required</p>}
      {error && <p className="error">{error}</p>}
      <button type="submit" className="btn btn-primary px-5">
        Sign In
      </button>
    </form>
  ) : (
    <Navigate to="/" />
  );
}

export default AuthPage;
