import { FaCreditCard, FaReceipt, FaShoppingCart } from "react-icons/fa";
import { useLocation } from "react-router";

import "./CheckoutStepper.sass"

const steps = [
    { id: 1, path: "/cart", icon: <FaShoppingCart />},
    { id: 2, path: "/payment", icon: <FaCreditCard />},
    { id: 3, path: "/invoice", icon: <FaReceipt />},
]

export default function CheckoutStepper() {
    const location = useLocation()

    return (
        <div className="checkout-stepper">
            {steps.map((step, index) => (
                <div key={step.id} className="checkout-stepper__container">
                    <div className={`checkout-stepper__icon-box ${location.pathname === step.path ? "active" : ""}`}>
                        <span>{step.icon}</span>
                    </div>
                    {index < steps.length -1 && <div className="checkout-stepper__line"/>}
                </div>
            ))}
        </div>
    )
}