import { useState, useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";
import "../NavBar/NavBar.sass";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { MobileSearch, Search } from "../Search/Search";

import { useCartStore } from "../Cart/CartStore";
import CartDropdown from "../Cart/CartDropdown";
import ShopDropdown from "../shop_dropdown/shop_dropdown";
import { API_BASE_URL } from "../../config/api";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [categories, setCategories] = useState([]);

  const currentUser = useAuthStore((state) => state.currentUser);
  const navigate = useNavigate();

  const totalItems = useCartStore((state) => state.totalItems);

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        const data = await response.json();
        setCategories(data.map((cat) => cat.name));
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Get first name from full name
  const getFirstName = () => {
    if (!currentUser || !currentUser.fullName) return null;
    return currentUser.fullName.split(" ")[0];
  };

  const handleNavigate = (path, id) => {
    setActive(id);
    navigate(path);
    setMenuOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
  };

  const toggleCart = () => {
    setCartOpen((prev) => !prev);
    setSearchOpen(false);
    setMenuOpen(false);
    setShopOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    setCartOpen(false);
    setShopOpen(false);
  };

  const toggleShop = () => {
    setShopOpen((prev) => !prev);
    setCartOpen(false);
    setSearchOpen(false);
    setMenuOpen(false);
  };

  const links = [
    { id: "shop", label: "Shop", icon: <AiOutlineShopping />, path: "/shop" },
    {
      id: "about",
      label: "About Us",
      icon: <AiOutlineUser />,
      path: "/aboutus",
    },
    {
      id: "contact",
      label: "Contact Us",
      icon: <AiOutlineMessage />,
      path: "/contact",
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <div
            className="navbar__logo"
            onClick={() => handleNavigate("/", "home")}>
            <svg
              width="56"
              height="57"
              viewBox="0 0 56 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <rect width="56" height="57" fill="url(#pattern0_22_3)" />
              <defs>
                <pattern
                  id="pattern0_22_3"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1">
                  <use
                    xlinkHref="#image0_22_3"
                    transform="scale(0.0178571 0.0175439)"
                  />
                </pattern>
                <image
                  id="image0_22_3"
                  width="56"
                  height="57"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA5CAYAAABj2ui7AAADIUlEQVRoQ+1aMUhyURT+dCjcJGh0apOGoEEEA5GgwSXMjERDIxA0gghqiYIiMJLAIggSpSiICiFoiBoiUJFoqaG2IgjccnHWn3PhyV/5uhL6uC/uARfv8ZzvO9+7556rGmq1Wg1/2AxE0GAw/EmKpJ0kqGdppYJ6Vo+wSwWlgoJXQD6iggvEhScV5JZIcAepoOACceFJBbklEtxBKii4QFx4UkFuiQR3kAoKLhAXnlSQWyLBHaSCggvEhScV5JZIcAepoOACceGpKtjV1YW+vj48Pz+jVCqxQN3d3ejt7cXDwwM+Pj7qwS0WC3p6enB/f49KpcJNqqWDKkG/34+joyMsLS1hdXWVYZqensb29jYCgQBbUyyZTGJmZgYOhwP5fF5L/NxcqgTHxsZwfHzMSO3s7LBACunx8XG2plgikcDc3BzsdjuKxSI3qZYOqgRHRkZwdnaGtbU1bG1tgX4gDYVCiMfj8Pl8OD09reOk9xYWFmCz2XB3d6clfm4uLsFGEYh8Npv9GwQvLi5wfX3NyNAeGx0dZS9SVzFdKuj1etljGAwGcXh4yLi43W4QYdqfJycn+iY4MTGB/f19rKysYHl5mZGZnZ3F5uYm24u0ptju7i4ikQgGBgaQy+W4+0JLB9U9ODQ0BAJOR0Q6nWaY6NFcX19HNBrF5eVlHSd10FgshuHhYTw+PmqJn5urIUHqmLy/zqj5NPNZLqoWOrScYAuxtSTUrwm2JLsGQVT3YH9/Pxu/zGYzaC6tVqswGo1YXFzE7e3tJ2jUcT0eD1t7eXnRAHbzKVQJhsPhenMpl8vo7Oxk0wyNaefn558yZDIZ1lmdTuc38s1DaY+nKkHlHPx6qDeCoeuD/uDggE0tHR0d7Or09PT0jaMuCSrD9v9siCgp+tV0TZCuSjSqmUwmvL294fX19dsZqUuCyh6cnJwENRHFGh3kuiQ4NTWFvb09bGxsYH5+/scWR3Mpza4ulws3NzftaYe/jKraRa1WK7vYXl1doVAo/Bh+cHCQXaVSqRTe399/CaU9H5NfG7anrtpFlQpqV+v2ZKor2J7wYkT9BzSYunS7hP95AAAAAElFTkSuQmCC"
                />
              </defs>
            </svg>
          </div>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {links.map(({ id, label, path }) => (
              <li
                key={id}
                className={`navbar__link ${
                  active === id ? "navbar__link--active" : ""
                }`}
                onClick={() =>
                  id === "shop" ? toggleShop() : handleNavigate(path, id)
                }>
                {id === "shop" ? (
                  <button
                    id="shop-anchor"
                    popoverTarget="shop-popover"
                    className="navbar__shop-button"
                    aria-label="Shop">
                    {label}
                  </button>
                ) : (
                  label
                )}
              </li>
            ))}
          </ul>
          <ShopDropdown
            id="shop-popover"
            categories={categories}
            onSelectCategory={(category) => {
              if (category === null) {
                handleNavigate("/shop", "shop");
                document.getElementById("shop-popover")?.hidePopover();
                return;
              } else {
                handleNavigate(`/shop?category=${category}`, "shop");
                document.getElementById("shop-popover")?.hidePopover();
              }
            }}
          />
        </div>

        {/* Actions (Search, Profile, Cart) */}
        <div className="navbar__actions">
          <Search searchOpen={searchOpen} toggleSearch={toggleSearch} />

          <div className="navbar__profile-container">
            <Link to={getFirstName() ? "/profile" : "/login"}>
              <AiOutlineUser size={24} className="navbar__profile" />
            </Link>
            {getFirstName() ? (
              <p className="navbar__welcome-message">
                Welcome {getFirstName()}!
              </p>
            ) : (
              <span></span>
            )}
          </div>

          <div className="navbar__cart-container" onClick={toggleCart}>
            <button
              id="cart-anchor"
              className="navbar__cart-button"
              popoverTarget="cart-popover"
              aria-label="Shopping Cart">
              <AiOutlineShoppingCart size={24} className="navbar__cart" />
            </button>

            {totalItems() > 0 && (
              <span className="navbar__cart-badge">{totalItems()}</span>
            )}
          </div>

          <CartDropdown id="cart-popover" />
          {/* {cartOpen && <CartDropdown />} */}

          <button
            className="navbar__menu-toggle"
            onClick={() => setMenuOpen(true)}>
            <FaBars size={24} />
          </button>
        </div>
      </div>

      <div
        className={`navbar__search-mobile ${
          searchOpen ? "navbar__search-mobile--open" : ""
        }`}>
        <MobileSearch searchOpen={searchOpen} />
      </div>

      {/* Overlay */}
      <div
        className={`navbar__overlay ${
          menuOpen ? "navbar__overlay--visible" : ""
        }`}
        onClick={() => setMenuOpen(false)}></div>

      {/* Mobile Menu */}
      <div
        className={`navbar__mobile-menu ${
          menuOpen ? "navbar__mobile-menu--open" : ""
        }`}>
        <button
          className="navbar__mobile-close"
          onClick={() => setMenuOpen(false)}>
          <FaTimes size={24} />
        </button>

        <ul className="navbar__mobile-links">
          {links.map(({ id, label, icon, path }) => (
            <li
              key={id}
              className={`navbar__mobile-link ${
                active === id ? "navbar__mobile-link--active" : ""
              }`}
              onClick={() => handleNavigate(path, id)}>
              <span className="navbar__mobile-icon">{icon}</span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
