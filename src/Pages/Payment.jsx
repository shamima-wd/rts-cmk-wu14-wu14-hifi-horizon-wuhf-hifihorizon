import { useCartStore } from "../Components/Cart/CartStore";

import CheckoutStepper from "../Components/CheckoutStepper/CheckoutStepper";
import DeliveryMethod from "../Components/PaymentPage/DeliveryMethod/DeliveryMethod";
import PaymentForm from "../Components/PaymentPage/PaymentForm/PaymentForm";
import PaymentMethod from "../Components/PaymentPage/PaymentMethod/PaymentMethod";

import "../Styles/payment.sass"

export default function Payment() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());

  return (
    <div className="payment-page">
      <CheckoutStepper />

      <div className="payment-page__content">
        <div className="payment-page__left">
          <div className="payment-page__form-title">
            <h3>Your info</h3>
            <PaymentForm />
          </div>

          <div className="payment-page__delivery-title">
            <h3>Select your prefered delivery method</h3>
            <DeliveryMethod />
          </div>

          <div className="payment-page__payment-method-title">
            <h3>Choose payment method</h3>
            <PaymentMethod />
          </div>
        </div>

        <div className="payment-page__right">
          <div className="payment-page__overview">
            <h2>Payment overview</h2>
            <ul className="payment-page__order-items-list">
              {items.map((item) => (
                <li key={item.id} className="payment-page__order-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="payment-page__total-row">
              <span>Price</span>
              <strong>€ {totalPrice.toFixed(2)}</strong>
            </div>

            <hr className="payment-page__divider" />

            <div className="payment-page__extra-costs">
                <div className="payment-page__cost-row">
                  <span>Delivery price</span>
                  <span>€ 4.00</span>
                </div>
                <div className="payment-page__cost-row">
                  <span>VAT</span>
                  <span>€ {(totalPrice * 0.2).toFixed(2)}</span>
                </div>
            </div>

            <div className="payment-page__total-row">
              <span>Total</span>
              <strong>€ {totalPrice.toFixed(2)}</strong>
            </div>
          </div>

          <div className="payment-page__checkout-actions">
          <label>
            <input type="checkbox" /> Subscribe to newsletter
          </label>
          <label>
            <input type="checkbox" /> I accept the terms of trade <strong>(read in new window)</strong>
          </label>
          <button className="payment-page__checkout-btn">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
