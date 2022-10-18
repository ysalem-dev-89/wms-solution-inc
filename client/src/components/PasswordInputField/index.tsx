import './styles.css'

function PasswordInputField({
  password,
  handlePasswordChange
}: {
  password: string
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="input-container">
      <p className="input-label">password:</p>
      <input
        onChange={handlePasswordChange}
        className="password"
        type="password"
        name="password"
        id="passwordInput"
        placeholder="Enter your password"
        value={password}
      />
    </div>
  )
}
export default PasswordInputField
