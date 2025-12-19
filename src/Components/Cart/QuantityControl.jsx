import { useCartStore } from "./CartStore";
import "./QuantityControl.sass"

export default function QuantityControl({ item }) {
    const updateQuantity = useCartStore(state => state.updateQuantity);

    return (
        <div className="quantity-control">
            <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="quantity-control__quantity-btn"
            >
                -
            </button>

            <span className="quantity-control__quantity-value">{item.quantity}</span>

            <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
                className="quantity-control__quantity-btn"
            >
                +
            </button>
        </div>
    )
}