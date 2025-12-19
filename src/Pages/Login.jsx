import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import "../Styles/login.scss";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [hidePassword, setHidePassword] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);

    // Use Zustand store to login
    const result = login(formData.email, formData.password);

    if (!result.success) {
      setStatus({ type: "error", message: result.message });
      return;
    }

    setStatus({ type: "success", message: result.message });

    // Redirect to home after 1 second
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="login-page">
      <h1 className="login-page__title">LOGIN</h1>

      <div className="login-page__container">
        <div className="login-form">
          <h2 className="login-form__subtitle">REGISTERED CUSTOMERS</h2>
          <p className="login-form__description">
            If you have an account, sign in with your email address.
          </p>
          <form className="login-form__form" onSubmit={handleSubmit}>
            <div className="login-form__group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-form__group">
              <label htmlFor="password">
                Password <span className="required">*</span>{" "}
                <button
                  type="button"
                  className="login-form__password-toggle"
                  onClick={() => setHidePassword(!hidePassword)}>
                  {hidePassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </label>
              <input
                type={hidePassword ? "password" : "text"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-form__check">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button type="submit" className="login-form__submit">
              SIGN IN
            </button>

            <Link to="/contact" className="login-form__link">
              Forgot your Password?
            </Link>
          </form>
        </div>

        <div className="new-customer">
          <h2 className="new-customer__subtitle">NEW CUSTOMER</h2>
          <p className="new-customer__description">
            Creating an account has many benefits: check out faster, keep more
            than one address and more.
          </p>
          <Link to="/signup" className="new-customer__button">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
