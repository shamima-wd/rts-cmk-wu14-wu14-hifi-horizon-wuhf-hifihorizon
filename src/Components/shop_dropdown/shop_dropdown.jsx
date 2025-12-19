import "./shop_dropdown.scss";

const formatCategoryName = (name) => {
  return name
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function ShopDropdown({ id, categories, onSelectCategory }) {
  return (
    <div id={id} popover="auto" className="shop-dropdown">
      <p className="shop-dropdown__title">Browse Categories</p>
      <ul className="shop-dropdown__categories">
        <li
          className="shop-dropdown__category-item"
          onClick={() => onSelectCategory(null)}>
          All Categories
        </li>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => onSelectCategory(category)}
            className="shop-dropdown__category-item">
            {formatCategoryName(category)}
          </li>
        ))}
      </ul>
    </div>
  );
}
