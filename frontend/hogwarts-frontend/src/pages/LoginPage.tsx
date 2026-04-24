import { useNavigate } from "react-router"
import { useState } from "react"
import { loginUser } from "../api/authApi.ts"
import type { UserInfo } from "../types"
import { AuthForm } from "../components/AuthForm.tsx"

export function LoginPage() {
    const navigator = useNavigate()
    const [error, setError] = useState("");

    const handleLogin = (userInfo: UserInfo) => {
        setError("");
        loginUser(userInfo).then(() => {
            navigator("/login/new-user");
        }).catch(() => {
            handleOnError("Invalid credentials");
        })
    }

    const handleRegisterClick = () => {
        navigator("/register");
    }

    const handleOnError = (message: string) => {
        setError(message);
        setTimeout(() => setError(""), 3000);
    }

    return (
        <div className="form-page-container">
            <div className="form-wrapper">
                <AuthForm
                    onError={handleOnError}
                    onSuccess={handleLogin}
                    submitLabel="Login"
                >
                    <div>
                        <span className="form-toggle-text">Don't have an account?</span>
                        <button
                            type="button"
                            className="form-link form-toggle-btn"
                            onClick={handleRegisterClick}
                        >
                            Register
                        </button>
                    </div>
                </AuthForm>
                <p className={`form-error-message ${error ? 'visible' : ''}`}>{error}</p>
            </div>
        </div>
    )
}