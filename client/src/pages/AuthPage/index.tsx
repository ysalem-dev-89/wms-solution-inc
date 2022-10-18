import { useState } from 'react'
import AuthButton from '../../components/AuthButton'
import UsernameInputField from '../../components/UserNameInputField'
import PasswordInputField from '../../components/PasswordInputField'
import './styles.css'
import signInApi from '../../api/auth'

function AuthPage() {
  const [password, setPassword] = useState('')
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const [username, setusername] = useState('')
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setusername(e.target.value)

  const signIn = () => {
    signInApi({ username, password })
  }

  return (
    <div className="auth-page">
      <form className="form-container">
        <img
          className="icon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIssP9pU6X4eKEFUGvyiGfqHSuHsqXO9v64Q&usqp=CAU"
          alt="Icon"
        />
        <UsernameInputField
          username={username}
          handleUsernameChange={handleUsernameChange}
        />
        <PasswordInputField
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
        <AuthButton signIn={signIn} />
      </form>
    </div>
  )
}

export default AuthPage
