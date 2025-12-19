import ShopFilterItem from "../shop_filter_item/shop_filter_item.jsx";
import { useCallback } from "react";

export default function ShopFilter({ filters, onFilterChange }) {
  const handleBrandChange = useCallback(
    (checkedBrands) => {
      onFilterChange((prev) => ({ ...prev, brands: checkedBrands }));
    },
    [onFilterChange]
  );

  const handleCategoryChange = useCallback(
    (checkedCategories) => {
      onFilterChange((prev) => ({ ...prev, categories: checkedCategories }));
    },
    [onFilterChange]
  );

  const handleColorChange = useCallback(
    (checkedColors) => {
      onFilterChange((prev) => ({ ...prev, colors: checkedColors }));
    },
    [onFilterChange]
  );

  const handlePriceChange = useCallback(
    (minPrice, maxPrice) => {
      onFilterChange((prev) => ({ ...prev, minPrice, maxPrice }));
    },
    [onFilterChange]
  );

  return (
    <>
      <h2>Sort by</h2>
      <ShopFilterItem
        name="Brand"
        options={filters.brands}
        onChange={handleBrandChange}
      />
      <ShopFilterItem
        name="Category"
        options={filters.categories}
        onChange={handleCategoryChange}
      />
      <ShopFilterItem
        name="Color"
        options={filters.colors}
        onChange={handleColorChange}
      />
      <ShopFilterItem
        name="Price"
        type="range"
        priceRange={filters.priceRange}
        onChange={handlePriceChange}
      />
    </>
  );
}
