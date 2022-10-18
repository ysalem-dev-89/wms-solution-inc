import './styles.css'

const AuthButton = ({ signIn }: { signIn: () => void }) => {
  return (
    <button className="button" type="button" onClick={signIn}>
      Login
    </button>
  )
}

export default AuthButton
