import { FaCcApplePay, FaCcMastercard, FaCcPaypal, FaCcStripe, FaCcVisa } from "react-icons/fa";
import "./PaymentMethod.sass"

export default function PaymentMethod() {
    return (
        <div className="payment-method">
            <div className="payment-method__credit-card">
                <input type="radio" name="credit" id="credit" />
                <div className="payment-method__credit-card-logo">
                    <span className="payment-method__credit-card-icons">
                        <FaCcStripe />
                        <FaCcVisa />
                        <FaCcMastercard />
                    </span>
                    <label htmlFor="credit">Pay with credit card</label>
                </div>
            </div>

            <div className="payment-method__paypal">
                <input type="radio" name="credit" id="paypal" />
                <span className="payment-method__paypal-icon">
                    <FaCcPaypal />
                </span>
                <label htmlFor="paypal">Pay with PayPal</label>
            </div>

            <div className="payment-method__apple-pay">
                <input type="radio" name="credit" id="applepay" />
                <span className="payment-method__apple-pay-icon">
                    <FaCcApplePay />
                </span>
                <label htmlFor="paypal">Pay with PayPal</label>
            </div>
        </div>
    )
}