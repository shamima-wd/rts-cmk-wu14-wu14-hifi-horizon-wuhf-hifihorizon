import "../AboutUs/AboutUs.sass"

export default function AboutUs() {
    return (
        <div className="about-us">
            <div className="about-us__content">
                <div className="about-us__what-we-do">
                    <h2>What we do</h2>
                    <p>
                        We look forward to customising a system to meet your needs.
                    </p>
                    <br />
                    <p>
                        We don’t favour one manufacturer over another – the only thing we do favour is making sure our customers get the right product that suits their needs and listening preferences. We will ask many questions in order to ensure that what you buy from us is tailored to you and you alone.
                    </p>
                    <br />
                    <p>
                        If you are looking for a product not found in our demonstration showrooms or our online site, don’t fret as we have access to hundreds of brands.
                    </p>
                    <br />
                    <p>
                        One of our biggest pleasures of working in this industry is to see the smile on our customers’ faces when they finally hear and see the system of their dreams.
                    </p>
                </div>

                <div className="about-us__opening-hours">
                    <div className="about-us__edinburgh">
                        <h2>Opening hours</h2>
                        <p><strong>Edinburgh</strong></p>
                        <p>2 Joppa Rd, Edinburgh, EH15 2EU</p>
                        <p>Monday to Friday: 10:00am - 5:30pm</p>
                        <p>Saturday: 10:00am - 5:30pm</p>
                        <p>Sunday: Closed</p>
                    </div>
                    <div className="about-us__Falkirk">
                        <h2>&nbsp;</h2>
                        <p><strong>Falkirk</strong></p>
                        <p>44 Cow Wynd, Falkirk, Central Region, FK1 1PU</p>
                        <p>Monday to Friday: 10:00am - 5:30pm</p>
                        <p>Saturday - By appointment only</p>
                        <p>Sunday: Closed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}