import { useLoaderData } from "react-router"
import { API_BASE_URL } from "../../config/api";

import "../ProductDetails/ProductDetails.sass"

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css"

import { useState } from "react";
import { useCartStore } from "../Cart/CartStore";

export default function ProductDetails() {
    const { product, category } = useLoaderData()
    const addItem = useCartStore(state => state.addItem);

    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [quantity, setQuantity] = useState(1);

    const maxStock = selectedVariant?.stock ?? 0;
    const variantKey = selectedVariant.color

    const increaseQuantity = () => {
        setQuantity(q => Math.min(q + 1, maxStock));
    }

    const decreaseQuantity = () => {
        setQuantity(q => Math.max(q - 1, 1));
    }



    const handleAddToCart = () => {
        if (maxStock === 0) return
        if (!selectedVariant) return

        addItem(
            {
                id: `${product.id}-${variantKey}`,
                productId: product.id,
                variantKey,
                name: `${product.name} (${selectedVariant.color})`,
                price: product.price,
                image: `${API_BASE_URL}/${selectedVariant.image}`,
                stock: maxStock,
            },
            quantity
        )
    }

    return (
        <div className="product-details">
            <div className="product-details__layout">
                <div className="product-details__info-header">
                    {/* Left side */}
                    <div className="product-details__image-slider-container">
                        <Swiper 
                            modules={[Navigation, Pagination]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation={{
                                nextEl: '.swiper-button-next-custom',
                                prevEl: '.swiper-button-prev-custom',
                            }}
                            pagination={{
                                el: '.swiper-pagination-custom',
                                clickable: true,
                                type: 'bullets',
                            }}
                            loop={true}
                            className="product-details__image-slider"
                        >
                            {product.images?.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img 
                                        src={`${API_BASE_URL}/${selectedVariant.image}`} 
                                        alt={`${product.name} - Image ${index + 1}`}
                                        className="product-details__image"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation Buttons */}
                        <div className="swiper-button-prev-custom">
                            <svg width="39" height="66" viewBox="0 0 39 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32.9991 65.25C31.5918 65.25 30.1838 64.719 29.1113 63.657L1.61133 36.4695C-0.537109 34.3455 -0.537109 30.9045 1.61133 28.7805L29.1113 1.59302C31.2598 -0.531006 34.7402 -0.531006 36.8887 1.59302C39.0371 3.71704 39.0371 7.15796 36.8887 9.28198L13.2765 32.625L36.8921 55.9723C39.0405 58.0963 39.0405 61.5372 36.8921 63.6612C35.8179 64.7232 34.4085 65.25 32.9991 65.25Z" fill="#D2D2D2"/>
                            </svg>
                        </div>

                        <div className="swiper-button-next-custom">
                            <svg width="39" height="66" viewBox="0 0 39 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.49914 65.2542C4.09183 65.2542 2.68383 64.7232 1.61133 63.6612C-0.537109 61.5372 -0.537109 58.0963 1.61133 55.9723L25.2304 32.6292L1.61133 9.28198C-0.537109 7.15796 -0.537109 3.71704 1.61133 1.59302C3.75977 -0.531006 7.24023 -0.531006 9.38867 1.59302L36.8887 28.7805C39.0371 30.9045 39.0371 34.3455 36.8887 36.4695L9.38867 63.657C8.31445 64.7275 6.9068 65.2542 5.49914 65.2542Z" fill="#D2D2D2"/>
                            </svg>
                        </div>

                        <div className="swiper-pagination-custom"></div>
                    </div> 

                    {/* Right Side */}
                    <div className="product-details__info">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>

                        <div className="product-details__variants">
                            {product.variants.map((variant, index) => (
                                <div key={index} className="product-details__color">
                                    <span
                                        className="product-details__color-swatch"
                                        style={{ background: variant.hex || variant.color }}
                                        onClick={() => setSelectedVariant(variant)}
                                    ></span>
                                    <span>{variant.color}</span>
                                </div>
                            ))}
                        </div>

                        <div className="product-details__price-stock">
                            <span className="product-details__price">€{product.price}</span>
                            <span className="product-details__stock">In Stock: {maxStock}</span>
                        </div>
                        <div className="product-details__cart">
                            <div className="product-details__quantity">
                                <button 
                                    className="product-details__quantity-btn"
                                    onClick={decreaseQuantity}
                                    disabled={quantity <= 1}
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>

                                <span className="product-details__quantity-value">{quantity}</span>

                                <button
                                    className="product-details__quantity-btn"
                                    onClick={increaseQuantity}
                                    disabled={quantity >= maxStock}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="product-details__add-to-cart-btn"
                                onClick={handleAddToCart}
                                disabled={maxStock === 0}
                            >
                                {maxStock === 0 ? "Out of Stock" : "Add to Cart"}
                            </button>
                        </div>
                    </div>
                </div>
                
                <hr />

                {/* Bottom Side - Product specifications */}
                <table className="product-details__specifications-table">
                    <tbody>
                        {Object.entries(product.specifications).map(([key, value]) => (
                            <tr key={key}>
                                <td className="product-details__spec-label">{key.replace(/_/g, " ")}</td>
                                <td className="product-details__spec-value">{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}