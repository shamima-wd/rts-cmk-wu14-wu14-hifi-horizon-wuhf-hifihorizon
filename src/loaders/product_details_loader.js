import { API_BASE_URL } from "../config/api";

export const loadProductDetails = async ({ params }) => {
  const productId = parseInt(params.productId);

  // Fetch all categories
  const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
  if (!categoriesResponse.ok) {
    throw new Error("Failed to load categories");
  }
  const categories = await categoriesResponse.json();

  // Find the product across all categories
  let product = null;
  let categoryInfo = null;

  for (const category of categories) {
    const foundProduct = category.products?.find((p) => p.id === productId);
    if (foundProduct) {
      product = foundProduct;
      categoryInfo = { id: category.id, name: category.name };
      break;
    }
  }

  if (!product) {
    throw new Error("Product not found");
  }

  return {
    product,
    category: categoryInfo,
  };
};
