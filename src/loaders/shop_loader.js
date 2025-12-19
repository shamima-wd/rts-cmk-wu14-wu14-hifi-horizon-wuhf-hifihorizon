import { API_BASE_URL } from "../config/api";

export const loadShop = async () => {
  // fetch all categories
  const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
  if (!categoriesResponse.ok) {
    throw new Error("Failed to load categories");
  }
  const categories = await categoriesResponse.json();

  // Extract all products from all categories
  const allProducts = categories.flatMap((category) => category.products || []);

  // Get unique brands
  const brands = [
    ...new Set(allProducts.map((product) => product.brand)),
  ].sort();

  // Get unique colors
  const colors = [
    ...new Set(
      allProducts.flatMap(
        (product) => product.variants?.map((variant) => variant.color) || []
      )
    ),
  ].sort();

  // Get price range (use discount_price if available)
  const prices = allProducts.map(
    (product) => product.discount_price ?? product.price
  );
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return {
    brands,
    colors,
    priceRange: { min: minPrice, max: maxPrice },
    categories: categories.map((cat) => cat.name),
    AllCategories: categories,
  };
};
