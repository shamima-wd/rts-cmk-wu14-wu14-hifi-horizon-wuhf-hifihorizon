import { useState } from "react"
import { AiOutlineHome, AiOutlinePhone, AiOutlineShopping, AiOutlineUser } from "react-icons/ai"
import { FaCcMastercard, FaCcStripe, FaCcVisa, FaFacebook, FaInstagram, FaStripe, FaTwitter, FaYoutube } from "react-icons/fa"
import { useNavigate } from "react-router"
import { HashLink } from "react-router-hash-link"

import "../Footer/Footer.sass"

export default function Footer() {
    const [active, setActive] = useState("home")

    // Navigation Links
    const navLinks = [
        { id: "home", label: "Home", icon: <AiOutlineHome />, path: "/" },
        { id: "shop", label: "Shop", icon: <AiOutlineShopping />, path: "/shop" },
        { id: "about", label: "About Us", icon: <AiOutlineUser />, path: "/aboutus" }
    ]

    // FAQ Links
    const faqLinks = [
        { id: "returns", label: "Returns & Refunds", path: "/faq#section__refunds" },
        { id: "delivery", label: "Delivery", path: "/faq#section__delivery" },
        { id: "privacy_policy", label: "Privacy Policy", path: "/faq#section__privacyPolicy" },
        { id: "terms_condition", label: "Terms & Conditions", path: "/faq#section__termsConditions" }
    ]

    // Contact Information
    const contactInfo = [
        {
            id: "edinburgh",
            label: "2 Joppa Rd, Edinburgh, EH15 2EU",
            phoneicon: <AiOutlinePhone />, 
            phone: "0131 556 7901"
        },
        {
            id: "falkirk",
            label: "44 Cow Wynd, Falkirk, Central Region, FK1 1PU",
            phoneicon: <AiOutlinePhone />,
            phone: "01324 629 011"
        }
    ]

    // Social Media Links
    const socialLinks = [
        { id: "facebook", label: "Facebook", path: "https://www.facebook.com/HifiHorizon", icon: <FaFacebook /> },
        { id: "twitter", label: "Twitter", path: "https://twitter.com/HifiHorizon", icon: <FaTwitter /> },
        { id: "instagram", label: "Instagram", path: "https://www.instagram.com/hifihorizon/", icon: <FaInstagram /> },
        { id: "youtube", label: "Youtube", path: "https://www.youtube.com/HiFiKlubbenDanmark", icon: <FaYoutube /> }
    ]

    // Payment Methods
    const paymentMethods = [
        { id: "stripe", label: "Stripe", icon: <FaCcStripe /> },
        { id: "visa", label: "Visa", icon: <FaCcVisa /> },
        { id: "master", label: "Mastercard", icon: <FaCcMastercard /> },
    ]

    const navigate = useNavigate()

    const handleNavigate = (path, id) => {
        setActive(id)
        navigate(path)
    }



    return (
        <footer className="footer">
            <div className="footer__main">
                <nav className="footer__nav">
                    <ul className="footer__nav-links">
                        {navLinks.map(({ id, label, path }) => (
                            <li
                                key={id}
                                className={`footer__nav-link ${active === id ? "footer__nav-link--active" : ""}`}
                                onClick={() => handleNavigate(path, id)}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="footer__faq">
                    <ul className="footer__faq-links">
                        {faqLinks.map(({ id, label, path }) => (
                            <li
                                key={id}
                                className="footer__faq-link"
                            >
                                <HashLink smooth to={path}>
                                    {label}
                                </HashLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer__contact">
                    <p className="footer__contact-title">Contact</p>
                    {contactInfo.map(({ id, label, phoneicon, phone }) => (
                        <div key={id} className="footer__contact-item">
                            <p className="footer__contact-address">{label}</p>
                            <p className="footer__contact-phone">
                                {phoneicon}
                                <span>{phone}</span>
                            </p>
                        </div>
                    ))}
                    <div className="footer__social-media">
                        {socialLinks.map(({ id, label, path, icon }) => (
                            <a 
                                key={id} 
                                href={path} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="footer__social-link"
                                aria-label={label}
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            
            <hr className="footer__break-line" />

            <div className="footer__payments">
                <div className="footer__payments-methods">
                    {paymentMethods.map(({ id, label, icon }) => (
                        <div key={id} className="footer__payment-method" aria-label={label}>
                            {icon}
                        </div>
                    ))}
                </div>
                <p>
                    HiFi Horizon (edinburgh) Ltd is registered in Scotland. No: SC049298. Registered office: 2 Joppa Rd, Edinburgh EH15 2EU
                </p>
            </div>
        </footer>
    )
}