import style from './Login.module.css'

const Login = () => {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 custom-login-card">
                <h2 className="text-center text-white mb-4">Login</h2>
                <form>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control custom-input"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control custom-input"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100 custom-login-button"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export { Login }
