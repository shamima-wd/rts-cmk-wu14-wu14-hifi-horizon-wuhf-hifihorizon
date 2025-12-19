import { useState } from "react";
import { useAuthStore } from "../../../stores/authStore";
import { FaFedex } from "react-icons/fa";

import "../DeliveryMethod/DeliveryMethod.sass"

export default function DeliveryMethod() {
    const [activeTab, setActiveTab] = useState("homeDelivery");
    const currentUser = useAuthStore((state) => state.currentUser);

    const addres = currentUser?.address? `${currentUser.address}${currentUser.address2 ? `, ${currentUser.address2}` : ""}\n${currentUser.zipcode} ${currentUser.city}\n${currentUser.country}` : "Not set"


    const deliveryContent = {
        homeDelivery: (
            <div className="home-delivery">
                <h3>Your order will be shipped to</h3>
                <br />
                <div className="home-delivery__address-container">
                    {addres.split('\n').map((line, index) => (
                        <div key={index} className="home-delivery__address-line">
                            {line}
                        </div>
                    ))}
                </div>
            </div>
        ),
        clickCollect: (
            <div className="location-list">
                <h3>Your order will be shipped to</h3>
                <label htmlFor="" className="location-list__item">
                    <input type="radio" name="location" defaultChecked />
                    <div className="location-list__item-info">
                        <strong>Edinburgh</strong>
                        <p>2 Joppa Rd, Edinburgh, EH15 2EU</p>
                        <p>Monday to Friday: 10:00am - 5:30pm</p>
                        <p>Saturday: 10:00am - 5:30pm</p>
                        <p>Sunday: Closed</p>
                    </div>
                </label>
                <label htmlFor="" className="location-list__item">
                    <input type="radio" name="location" />
                    <div className="location-list__item-info">
                        <strong>Falkirk</strong>
                        <p>44 Cow Wynd, Falkirk, Central Region, FK1 1PU</p>
                        <p>Monday to Friday: 10:00am - 5:30pm</p>
                        <p>Saturday - By appoinment only</p>
                        <p>Sunday: Closed</p>
                    </div>
                </label>
            </div>
        ),
        postOffice: (
            <div className="post-office">
                <p><strong>Your order will be shipped with FedEx</strong></p>
                <FaFedex size={48} color="#4d148c" />
                <div className="post-office__map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d530265.6706012022!2d130.89317519425393!3d-25.250877420607313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2b236c2c7ed3b881%3A0xdb2a86cd5fe91ae4!2sUlu%E1%B9%9Fu-Kata%20Tju%E1%B9%AFa%20National%20Park!5e0!3m2!1sda!2sdk!4v1766055347160!5m2!1sda!2sdk" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <ul className="post-office__po-list">
                    <li><input type="radio" name="postoffice" /> Postoffice - 4 Leah Close, Edinburgh, United Kingdom</li>
                    <li><input type="radio" name="postoffice" /> Postoffice - 7 The Old School House, Edinburgh, United Kingdom</li>
                    <li><input type="radio" name="postoffice" /> Postoffice - 28 Thwaites Oak Close, Edinburgh, United Kingdom</li>
                </ul>
            </div>
        ),
    }

    return (
        <div className="delivery-card">
            <div className="delivery-card__tabs">
                <button
                    className={activeTab === "homeDelivery" ? "active" : ""}
                    onClick={() => setActiveTab("homeDelivery")}
                >
                    Home Delivery
                </button>
                <button
                    className={activeTab === "clickCollect" ? "active" : ""}
                    onClick={() => setActiveTab("clickCollect")}
                >
                    Click & Collect
                </button>
                <button
                    className={activeTab === "postOffice" ? "active" : ""}
                    onClick={() => setActiveTab("postOffice")}
                >
                    Postoffice
                </button>
            </div>

            <div className="delivery-card__content">
                {deliveryContent[activeTab]}
            </div>
        </div>
    )
}