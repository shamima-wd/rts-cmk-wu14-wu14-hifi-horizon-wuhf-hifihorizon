import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import "../Styles/signup.scss";

export default function Signup() {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    address2: "",
    zipcode: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    marketing: false,
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match" });
      return;
    }

    // Validate terms acceptance
    if (!formData.terms) {
      setStatus({ type: "error", message: "You must accept the terms" });
      return;
    }

    // Create account object (excluding confirmPassword)
    const { confirmPassword, ...accountData } = formData;

    // Use Zustand store to signup
    const result = signup(accountData);

    if (!result.success) {
      setStatus({ type: "error", message: result.message });
      return;
    }

    setStatus({ type: "success", message: result.message });

    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="signup-page">
      <h1 className="signup-page__title">CREATE AN ACCOUNT</h1>
      <div className="signup-form">
        <h2 className="signup-form__subtitle">CREATE NEW CUSTOMER ACCOUNT</h2>
        {status && (
          <div
            className={`signup-form__status signup-form__status--${status.type}`}>
            {status.message}
          </div>
        )}
        <form className="signup-form__form" onSubmit={handleSubmit}>
          <div className="signup-form__group">
            <label htmlFor="fullname">
              Full name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullname"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-form__group">
            <label htmlFor="address">
              Address <span className="required">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-form__group">
            <label htmlFor="address2">Address - line 2</label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
          </div>

          <div className="signup-form__row">
            <div className="signup-form__group signup-form__group--half">
              <label htmlFor="zipcode">
                Zip code <span className="required">*</span>
              </label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="signup-form__group signup-form__group--half">
              <label htmlFor="city">
                City <span className="required">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-form__row">
            <div className="signup-form__group signup-form__group--half">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className="signup-form__group signup-form__group--half">
              <label htmlFor="phone">Phone no.</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="signup-form__group">
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

          <div className="signup-form__group">
            <label htmlFor="password">
              Password <span className="required">*</span>{" "}
              <button
                type="button"
                className="signup-form__password-toggle"
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

          <div className="signup-form__group">
            <label htmlFor="confirmPassword">
              Repeat password <span className="required">*</span>{" "}
              <button
                type="button"
                className="signup-form__password-toggle"
                onClick={() => setHidePassword(!hidePassword)}>
                {hidePassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </label>
            <input
              type={hidePassword ? "password" : "text"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-form__checks">
            <div className="signup-form__check">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms">
                By using this form you agree with the storage and handling of
                your data by this website. <span className="required">*</span>
              </label>
            </div>
            <div className="signup-form__check">
              <input
                type="checkbox"
                id="marketing"
                name="marketing"
                checked={formData.marketing}
                onChange={handleChange}
              />
              <label htmlFor="marketing">
                Accept marketing from HiFi Horizon (newsletter and discount
                offers by email). <span className="required">*</span>
              </label>
            </div>
          </div>

          <button type="submit" className="signup-form__submit">
            Create an Account
          </button>
        </form>
      </div>
    </div>
  );
}
