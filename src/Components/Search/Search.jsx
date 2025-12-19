import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router";
import "../Search/Search.sass";

export function Search({ searchOpen, toggleSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {/* 1. Search Bar for Desktops (hidden on mobile) */}
      <form
        className="navbar__search navbar__search--desktop"
        onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="navbar__search-button">
          <FaSearch size={18} className="navbar__search-icon" />
        </button>
      </form>

      {/* 2. Mobile Search Toggle Icon (visible on mobile, changes color when active) */}
      <button
        className={`navbar__search-toggle ${
          searchOpen ? "navbar__search-toggle--active" : ""
        }`}
        onClick={toggleSearch}>
        <FaSearch size={24} />
      </button>
    </>
  );
}

export function MobileSearch({ searchOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div
      className={`navbar__search-mobile ${
        searchOpen ? "navbar__search-mobile--open" : ""
      }`}>
      <form className="navbar__search-mobile-container" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </div>
  );
}
