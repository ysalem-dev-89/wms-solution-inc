import './styles.css'

function UsernameInputField({
  username,
  handleUsernameChange
}: {
  username: string
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="input-container">
      <p className="input-label">User name:</p>
      <input
        onChange={handleUsernameChange}
        className="user-name"
        type="username"
        name="username"
        id="usernameInput"
        placeholder="Enter your name"
        value={username}
      />
    </div>
  )
}

export default UsernameInputField
