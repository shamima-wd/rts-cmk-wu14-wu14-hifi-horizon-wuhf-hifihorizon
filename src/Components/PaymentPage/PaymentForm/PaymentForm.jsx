import "./PaymentForm.sass"

export default function PaymentForm() {
    return (
        <div className="payment-form">
            <form className="payment-form__form-inner">

                <div className="payment-form__form-group">
                    <label htmlFor="fullname">
                        Full Name <span className="required">*</span>
                    </label>
                    <input type="text" id="fullname" name="fullname" required />
                </div>

                <div className="payment-form__row">
                    <div className="payment-form__form-group payment-form__form-group--half">
                        <label htmlFor="zipcode">
                            Zip-code <span className="required">*</span>
                        </label>
                        <input type="text" id="zipcode" name="zipcode" required />
                    </div>

                    <div className="payment-form__form-group payment-form__form-group--half">
                        <label htmlFor="city">
                            City <span className="required">*</span>
                        </label>
                        <input type="text" id="city" name="city" required />
                    </div>
                </div>

                <div className="payment-form__form-group">
                    <label htmlFor="address">
                        Address <span className="required">*</span>
                    </label>
                    <input type="text" id="address" name="address" required />
                </div>

                <div className="payment-form__form-group">
                    <label htmlFor="email">
                        Email <span className="required">*</span>
                    </label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div className="payment-form__form-group">
                    <label htmlFor="phone">
                        Phone Number <span className="required">*</span>
                    </label>
                    <input type="tel" id="phone" name="phone" required />
                </div>
            </form>
        </div>
    )
}