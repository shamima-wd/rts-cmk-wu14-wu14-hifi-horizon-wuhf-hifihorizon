import { useEffect, useState } from "react";
import ProductCard from "../../product_card/product_card";
import { API_BASE_URL} from "../../../config/api";
import { useNavigate } from "react-router";

import "../PopularProduct/popularproduct.sass"

export default function PopularProduct() {
    const [products, setProducts] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/categories`)
            .then(response => response.json())
            .then((data) => {
                const categoryProducts = data[0]?.products || []
                setProducts(categoryProducts.slice(0, 4))
            })
    }, [])

    const handleNavigate = () => {
        navigate('/shop');
    }

    return (
        <div className="popular-products">
            <div className="popular-products__section-header">
                <h2>Popular Products</h2>
                <button onClick={handleNavigate} className="popular-products__see-all-button">
                    See all products
                </button>
            </div>
            <div className="popular-products__grid">
                {products.map((product) => (
                    <ProductCard
                        className="popular-products__product-card"
                        key={product.id}
                        itemId={product.id}
                        name={product.name}
                        image={product.image}
                        price={`€${product.price}`}
                        stock={product.variants?.[0]?.stock || 0}
                        compareEnabled={false}
                        stockEnabled={false}
                    />
                ))}
            </div>
        </div>
    )
}