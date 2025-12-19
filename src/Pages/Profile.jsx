import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import {
  FiEdit2,
  FiUser,
  FiPhone,
  FiMail,
  FiLock,
  FiMapPin,
} from "react-icons/fi";
import "../Styles/profile.scss";

export default function Profile() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [activeTab, setActiveTab] = useState("profile");
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const updateUser = useAuthStore((state) => state.updateUser);

  // Redirect if not authenticated
  if (!isAuthenticated()) {
    navigate("/login");
    return null;
  }

  const profileFields = [
    {
      icon: <FiUser />,
      label: "Name",
      value: currentUser?.fullName || "Not set",
    },
    {
      icon: <FiPhone />,
      label: "Phone number",
      value: currentUser?.phone || "Not set",
    },
    {
      icon: <FiMail />,
      label: "Mail",
      value: currentUser?.email || "Not set",
    },
    {
      icon: <FiLock />,
      label: "Password",
      value: "••••••••",
    },
    {
      icon: <FiMapPin />,
      label: "Address",
      value: currentUser?.address
        ? `${currentUser.address}${
            currentUser.address2 ? `, ${currentUser.address2}` : ""
          }\n${currentUser.zipcode} ${currentUser.city}\n${currentUser.country}`
        : "Not set",
      isAddress: true,
    },
  ];

  const [addressData, setAddressData] = useState({
    address: "",
    address2: "",
    zipcode: "",
    city: "",
    country: "",
  });

  const handleEdit = (field) => {
    setEditingField(field.label);

    if (field.label === "Password") {
      const accounts = useAuthStore.getState().accounts;
      const account = accounts.find((acc) => acc.id === currentUser.id);
      setEditValue(account?.password || "");
    } else if (field.label === "Address") {
      setAddressData({
        address: currentUser?.address || "",
        address2: currentUser?.address2 || "",
        zipcode: currentUser?.zipcode || "",
        city: currentUser?.city || "",
        country: currentUser?.country || "",
      });
    } else {
      setEditValue(field.value === "Not set" ? "" : field.value);
    }
  };

  const handleSave = () => {
    const fieldMap = {
      Name: "fullName",
      "Phone number": "phone",
      Mail: "email",
      Password: "password",
    };

    if (editingField === "Address") {
      updateUser(addressData);
    } else {
      const key = fieldMap[editingField];
      updateUser({ [key]: editValue });
    }

    setEditingField(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue("");
  };

  const handleLogout = () => {
    const logout = useAuthStore.getState().logout;
    logout();
    navigate("/");
  };
  return (
    <div className="profile-page">
      <div className="profile-page__container">
        <div className="profile-tabs">
          <button
            className={`profile-tabs__tab ${
              activeTab === "profile" ? "profile-tabs__tab--active" : ""
            }`}
            onClick={() => setActiveTab("profile")}>
            Profile
          </button>
          <button
            className={`profile-tabs__tab ${
              activeTab === "orders" ? "profile-tabs__tab--active" : ""
            }`}
            onClick={() => setActiveTab("orders")}>
            Orders
          </button>
        </div>

        {activeTab === "profile" && (
          <div className="profile-content">
            <h2 className="profile-content__title">YOUR PROFILE INFORMATION</h2>

            <div className="profile-fields">
              {profileFields.map((field, index) => (
                <div
                  key={index}
                  className={`profile-field ${
                    editingField === field.label ? "profile-field--editing" : ""
                  }`}>
                  <div className="profile-field__icon">{field.icon}</div>
                  <div className="profile-field__content">
                    <span className="profile-field__label">{field.label}</span>
                    {editingField === field.label ? (
                      field.isAddress ? (
                        <div className="profile-field__address-inputs">
                          <input
                            type="text"
                            placeholder="Address"
                            value={addressData.address}
                            onChange={(e) =>
                              setAddressData({
                                ...addressData,
                                address: e.target.value,
                              })
                            }
                            className="profile-field__input"
                          />
                          <input
                            type="text"
                            placeholder="Address 2 (optional)"
                            value={addressData.address2}
                            onChange={(e) =>
                              setAddressData({
                                ...addressData,
                                address2: e.target.value,
                              })
                            }
                            className="profile-field__input"
                          />
                          <div className="profile-field__row">
                            <input
                              type="text"
                              placeholder="Zipcode"
                              value={addressData.zipcode}
                              onChange={(e) =>
                                setAddressData({
                                  ...addressData,
                                  zipcode: e.target.value,
                                })
                              }
                              className="profile-field__input"
                            />
                            <input
                              type="text"
                              placeholder="City"
                              value={addressData.city}
                              onChange={(e) =>
                                setAddressData({
                                  ...addressData,
                                  city: e.target.value,
                                })
                              }
                              className="profile-field__input"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Country"
                            value={addressData.country}
                            onChange={(e) =>
                              setAddressData({
                                ...addressData,
                                country: e.target.value,
                              })
                            }
                            className="profile-field__input"
                          />
                        </div>
                      ) : (
                        <textarea
                          className="profile-field__input"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          rows={1}
                        />
                      )
                    ) : (
                      <span className="profile-field__value">
                        {field.value.split("\n").map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < field.value.split("\n").length - 1 && <br />}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                  {editingField === field.label ? (
                    <div className="profile-field__actions">
                      <button
                        onClick={handleSave}
                        className="profile-field__save">
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="profile-field__cancel">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="profile-field__edit"
                      onClick={() => handleEdit(field)}
                      aria-label={`Edit ${field.label}`}>
                      <FiEdit2 />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button className="profile-content__logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="profile-content">
            <h2 className="profile-content__title">YOUR ORDERS</h2>
            <p className="profile-content__empty">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
