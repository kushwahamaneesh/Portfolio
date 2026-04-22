export default function AdminLoginForm({
  fieldClass,
  handleAdminLogin,
  loginError,
  loginForm,
  primaryButtonClass,
  setLoginForm,
}) {
  return (
    <form className="grid gap-4" onSubmit={handleAdminLogin}>
      <p className="text-sm leading-6 text-[color:var(--text-soft)]">
        This panel is only for the admin. Please enter your login credentials to
        manage the website.
      </p>

      <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-strong)]">
        Username
        <input
          className={fieldClass}
          type="text"
          value={loginForm.username}
          onChange={(event) =>
            setLoginForm((currentValue) => ({
              ...currentValue,
              username: event.target.value,
            }))
          }
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-strong)]">
        Password
        <input
          className={fieldClass}
          type="password"
          value={loginForm.password}
          onChange={(event) =>
            setLoginForm((currentValue) => ({
              ...currentValue,
              password: event.target.value,
            }))
          }
        />
      </label>

      {loginError ? (
        <p className="rounded-[20px] border border-[rgba(255,98,98,0.34)] bg-[rgba(86,21,21,0.42)] p-4 text-sm text-[color:var(--danger-text)]">
          {loginError}
        </p>
      ) : null}

      <button className={primaryButtonClass} type="submit">
        Login as Admin
      </button>
    </form>
  )
}
