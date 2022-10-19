import { useForm } from 'react-hook-form';
import './styles.css';
import signInApi from '../../api/auth';
import { useState } from 'react';
import { Credential } from '../../interfaces/CredentialInterface';

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

  const signIn = (data: Credential) => {
    signInApi(data)
      .then(result => {
        if (result.data.error) {
          setError(result.data.error);
        } else {
          setError('');
        }
      })
      .catch(error => {
        console.error(error);
      });
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
        <input className="button" type="submit" />
      </form>
    </div>
  );
}

export default AuthPage;
