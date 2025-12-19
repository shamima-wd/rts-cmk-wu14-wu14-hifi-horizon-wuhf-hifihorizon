import "../Newsletter/Newsletter.sass"

export default function Newsletter() {
    return (
        <div className="newsletter">
            <div className="newsletter__content">
                <h2>Subscribe to our Newsletter</h2>
                <p>Subscribing to our newsletter secures you uo to date information about HiFi Horizons latest updates and offers.</p>
                <form className="newsletter__form">
                    <input type="email" placeholder="Enter your email" required />
                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}