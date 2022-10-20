import { useForm } from 'react-hook-form';
import './styles.css';
import { authApi } from '../../api';
import { useState } from 'react';
import { Credential } from '../../interfaces/CredentialInterface';
import { AxiosError } from 'axios';

function AuthPage() {
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
      const response = await authApi.signInApi(data);
      // TODO: redirect to dashboard
    } catch (error: unknown) {
      const exception = error as AxiosError;
      if (exception.response) {
        if (exception.response.status === 400) {
          setError('The username or password is incorrect');
        } else {
          setError('Something went wrong');
        }
      } else if (exception.request) {
        setError('Something went wrong, please try again later');
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <div className="auth-page">
      <form
        className="form-container"
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
        <input className="button" type="submit" value="test" />
      </form>
    </div>
  );
}

export default AuthPage;
