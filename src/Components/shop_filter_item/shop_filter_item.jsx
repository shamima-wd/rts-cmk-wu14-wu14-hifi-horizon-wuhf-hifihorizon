import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaCircle } from "react-icons/fa6";
import { IoCheckmarkOutline } from "react-icons/io5";
import { Range } from "react-range";
import "./shop_filter_item.scss";

export default function ShopFilterItem({
  name,
  options,
  type = "checkbox",
  priceRange,
  onChange,
}) {
  const [minPrice, setMinPrice] = useState(priceRange?.min || 0);
  const [maxPrice, setMaxPrice] = useState(priceRange?.max || 0);
  const [isOpen, setIsOpen] = useState(false);
  const [checkedOptions, setCheckedOptions] = useState(new Set());

  useEffect(() => {
    if (minPrice > maxPrice) {
      setMinPrice(maxPrice);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (maxPrice < minPrice) {
      setMaxPrice(minPrice);
    }
  }, [maxPrice, minPrice]);

  // Call onChange when checkedOptions changes
  useEffect(() => {
    if (onChange && type === "checkbox") {
      onChange(checkedOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedOptions, type]);

  // Call onChange when price changes
  useEffect(() => {
    if (onChange && type === "range") {
      onChange(minPrice, maxPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPrice, maxPrice, type]);

  const handleToggle = (e) => {
    setIsOpen(e.currentTarget.open);
  };

  const handleCheckboxChange = (option) => {
    setCheckedOptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(option)) {
        newSet.delete(option);
      } else {
        newSet.add(option);
      }
      return newSet;
    });
  };

  if (type === "range") {
    return (
      <details open className="filter-item" onToggle={handleToggle}>
        <summary className="filter-item__name">
          {name}{" "}
          <IoIosArrowDown
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
        </summary>
        <div className="filter-item__sliders">
          <div className="filter-item__price-inputs">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="price-input"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-input"
            />
          </div>

          {/* Dual Range Slider */}
          <Range
            step={1}
            min={priceRange.min}
            max={priceRange.max}
            values={[minPrice, maxPrice]}
            onChange={(values) => {
              setMinPrice(values[0]);
              setMaxPrice(values[1]);
            }}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="range-track"
                style={{
                  ...props.style,
                  height: "4px",
                  width: "100%",
                  background: `linear-gradient(to right, 
                #d1d5db 0%, 
                #d1d5db ${
                  ((minPrice - priceRange.min) /
                    (priceRange.max - priceRange.min)) *
                  100
                }%, 
                #ff6600 ${
                  ((minPrice - priceRange.min) /
                    (priceRange.max - priceRange.min)) *
                  100
                }%, 
                #ff6600 ${
                  ((maxPrice - priceRange.min) /
                    (priceRange.max - priceRange.min)) *
                  100
                }%, 
                #d1d5db ${
                  ((maxPrice - priceRange.min) /
                    (priceRange.max - priceRange.min)) *
                  100
                }%, 
                #d1d5db 100%)`,
                }}>
                {children}
              </div>
            )}
            renderThumb={({ props, isDragged }) => {
              const { key, ...restProps } = props;
              return (
                <div
                  key={key}
                  {...restProps}
                  className="range-thumb"
                  style={{
                    ...restProps.style,
                    height: "32px",
                    width: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#ff6600",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: isDragged
                      ? "0 0 0 4px rgba(255, 102, 0, 0.3)"
                      : "0 2px 4px rgba(0,0,0,0.2)",
                    outline: "none",
                  }}>
                  <div
                    style={{
                      height: "8px",
                      width: "8px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                    }}
                  />
                </div>
              );
            }}
          />
        </div>
      </details>
    );
  }

  return (
    <details className="filter-item" onToggle={handleToggle}>
      <summary className="filter-item__name">
        {name}{" "}
        <IoIosArrowDown
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        />
      </summary>
      <div className="filter-item__options">
        {options.map((option) => (
          <label key={option} className="filter-item__option">
            <div>
              <input
                type="checkbox"
                name={option}
                value={option}
                checked={checkedOptions.has(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </div>
            <div className="filter-item__checkbox">
              <FaCircle />
              {checkedOptions.has(option) ? (
                <IoCheckmarkOutline stroke="green" />
              ) : (
                <> </>
              )}
            </div>
          </label>
        ))}
      </div>
    </details>
  );
}
