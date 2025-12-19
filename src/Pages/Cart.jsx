import { useCartStore } from "../Components/Cart/CartStore";
import QuantityControl from "../Components/Cart/QuantityControl";
import { useNavigate } from "react-router";

import "../Styles/cart.sass"
import CheckoutStepper from "../Components/CheckoutStepper/CheckoutStepper";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-page-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <CheckoutStepper />
      <h1>Your Cart</h1>
      <div className="cart-page__items-list">
        {items.map((item) => (
          <div key={item.id} className="cart-page__item-card">
            <img src={item.image} alt={item.name} width="100" />
            
            <div className="cart-page__item-info">
              <h3>{item.name}</h3>
              <p>Price: €{item.price.toFixed(2)}</p>
            </div>
            <QuantityControl item={item} />

            <div className="cart-page__item-total">
              <p>€{(item.price * item.quantity).toFixed(2)}</p>
              <button className="cart-page__remove" onClick={() => updateQuantity(item.id, 0)}>x</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-page__summary">
        <h2>Subtotal: €{totalPrice.toLocaleString()}</h2>
        <div className="cart-page__actions">
          <button className="btn-primary" onClick={() => navigate("/payment")}>
            Go to payment
          </button>
        </div>
      </div>
    </div>
  );
}