import { useCartStore } from "./CartStore";
import QuantityControl from "./QuantityControl";
import "../Cart/CartDropdown.sass"
import { useNavigate } from "react-router";
import { useRef } from "react";

export default function CartDropdown({ id }) {
    const items = useCartStore(state => state.items);
    const totalPrice = useCartStore(state => state.totalPrice())
    const totalItemsCount = useCartStore(state => state.totalItems());
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const clearCart = useCartStore(state => state.clearCart);

    const navigate = useNavigate()
    const popoverRef = useRef(null)

    const handleNavigation = (path) => {
        if (popoverRef.current) {
            popoverRef.current.hidePopover()
        }
        navigate(path)
    }

    if (items.length === 0) {
        return <p>Your cart is empty</p>
    }

    return (
        <div id={id} popover="auto" className="cart-dropdown" ref={popoverRef}>
            <div className="cart-dropdown__header">
                <h2 className="cart-dropdown__title">Cart <span>({totalItemsCount} Items)</span></h2>
                <button onClick={clearCart}>Remove all</button>
            </div>
            <div className="cart-dropdown__list">
                {items.map(item => (
                    <div key={item.id} className="cart-dropdown__item">
                        <button className="cart-dropdown__remove" onClick={() => updateQuantity(item.id, 0)}>x</button>

                        <div className="cart-dropdown__item-content">
                            <img src={item.image} alt={item.name} className="cart-dropdown__img" />

                            <div className="cart-dropdown__item-details">
                                <p>{item.name}</p>

                                <div className="cart-dropdown__controls">
                                    <QuantityControl item={item} />
                                    <span className="cart-dropdown__price">€{item.price.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-dropdown__footer">
                <div className="cart-dropdown__subtotal">
                    <span>Sub total:</span>
                    <span className="amount">€ {totalPrice.toLocaleString()}</span>
                </div>
            </div>
            <div className="cart-dropdown__actions">
                <button className="btn-primary" onClick={() => handleNavigation("/cart")}>Go to cart</button>
                <button className="btn-secondary" onClick={() => handleNavigation("/payment")}>Go to payment</button>
            </div>
        </div>
    )
}