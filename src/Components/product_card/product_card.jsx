import { GiSettingsKnobs } from "react-icons/gi";
import { API_BASE_URL } from "../../config/api";
import { Link } from "react-router";
import { useCartStore } from "../Cart/CartStore";
import "./product_card.scss";

export default function ProductCard({
  itemId,
  name,
  image,
  price,
  stock,
  compareEnabled,
  stockEnabled,
  cartEnabled,
}) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (stock <= 0) return;

    addItem(
      {
        id: itemId,
        productId: itemId,
        name: name,
        price: price,
        image: `${API_BASE_URL}/${image}`,
        stock: stock,
      },
      1
    );
  };

  return (
    <article className="product-card">
      {compareEnabled && (
        <div className="product-card__compare">
          <button className="product-card__compare-button">Compare</button>
          <GiSettingsKnobs />
        </div>
      )}
      <Link to={`/productdetails/${itemId}`} className="product-card__link">
        <img
          className="product-card__image"
          src={`${API_BASE_URL}/${image}`}
          alt={name}
          {...(cartEnabled ? {} : { style: { objectFit: "cover" } })}
        />
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">{price}</p>
      </Link>
      <section
        className="product-card__cart-stock"
        {...(cartEnabled ? {} : { style: { justifyContent: "center" } })}>
        {cartEnabled ? (
          stock > 0 ? (
            <button
              className="product-card__add-to-cart"
              onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <p className="product-card__out-of-stock">Out of Stock</p>
          )
        ) : (
          <Link
            to={`/productdetails/${itemId}`}
            className="product-card__add-to-cart">
            Read More
          </Link>
        )}
        {stockEnabled && (
          <p
            className={`product-card__stock ${
              stock <= 0 ? "product-card__stock--out-of-stock" : ""
            }`}>
            {stock > 0 ? `In stock: ${stock}` : <>Out of stock: 0</>}
          </p>
        )}
      </section>
    </article>
  );
}
